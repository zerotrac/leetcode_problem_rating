import json

raw_data = [[y for y in x.strip().split("\t") if y] for x in open("ratings.txt")]
title = [x.replace(" ", "") for x in raw_data[0]] + ["ContestID"]
body = raw_data[1:]

def contest_slug_to_id(contest_slug: str) -> str:
    idx = contest_slug.split("-")[-1]
    if contest_slug.startswith("bi"):
        return f"BiC {idx}"
    else:
        return f"WC {idx}"

obj = list()
for line in body:
    line = [float(line[0]), int(line[1]), line[2], line[3], line[4], line[5], contest_slug_to_id(line[4])]
    obj.append({k: v for k, v in zip(title, line)})

with open("data.json", "w") as fout:
    json.dump(obj, fout)
 