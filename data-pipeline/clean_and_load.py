import pandas as pd
import psycopg2
import os
import glob

conn = psycopg2.connect(
    host="localhost",
    port=5432,
    database="villages_db",
    user="postgres",
    password="Vanshika"
)
cur = conn.cursor()

raw_folder = "../data/raw/"
files = glob.glob(os.path.join(raw_folder, "*.xls"))

states_map = {}
districts_map = {}
sub_districts_map = {}

total_villages = 0

for file in files:
    print(f"Processing: {os.path.basename(file)}")
    try:
        df = pd.read_excel(file)
        df.columns = df.columns.str.strip()
        df = df.dropna(subset=["Area Name"])
        df = df[df["MDDS PLCN"] != 0]

        for _, row in df.iterrows():
            state_name = str(row["STATE NAME"]).strip().title()
            state_code = str(int(row["MDDS STC"]))
            district_name = str(row["DISTRICT NAME"]).strip().title()
            district_code = str(int(row["MDDS DTC"]))
            subdt_name = str(row["SUB-DISTRICT NAME"]).strip().title()
            subdt_code = str(int(row["MDDS Sub_DT"]))
            village_name = str(row["Area Name"]).strip().title()

            if state_code not in states_map:
                cur.execute(
                    "INSERT INTO states (name, code) VALUES (%s, %s) ON CONFLICT (code) DO NOTHING RETURNING id",
                    (state_name, state_code)
                )
                result = cur.fetchone()
                if result:
                    states_map[state_code] = result[0]
                else:
                    cur.execute("SELECT id FROM states WHERE code = %s", (state_code,))
                    states_map[state_code] = cur.fetchone()[0]

            state_id = states_map[state_code]

            dist_key = f"{state_code}_{district_code}"
            if dist_key not in districts_map:
                cur.execute(
                    "INSERT INTO districts (name, state_id) VALUES (%s, %s) ON CONFLICT DO NOTHING RETURNING id",
                    (district_name, state_id)
                )
                result = cur.fetchone()
                if result:
                    districts_map[dist_key] = result[0]
                else:
                    cur.execute("SELECT id FROM districts WHERE name = %s AND state_id = %s", (district_name, state_id))
                    districts_map[dist_key] = cur.fetchone()[0]

            district_id = districts_map[dist_key]

            subdt_key = f"{state_code}_{district_code}_{subdt_code}"
            if subdt_key not in sub_districts_map:
                cur.execute(
                    "INSERT INTO sub_districts (name, district_id) VALUES (%s, %s) RETURNING id",
                    (subdt_name, district_id)
                )
                sub_districts_map[subdt_key] = cur.fetchone()[0]

            subdt_id = sub_districts_map[subdt_key]

            cur.execute(
                "INSERT INTO villages (name, sub_district_id) VALUES (%s, %s)",
                (village_name, subdt_id)
            )
            total_villages += 1

        conn.commit()
        print(f"Done: {os.path.basename(file)}")

    except Exception as e:
        print(f"Error in {file}: {e}")
        conn.rollback()

cur.close()
conn.close()
print(f"\nFinished! Total villages loaded: {total_villages}")