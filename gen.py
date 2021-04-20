import json

raw_data = [[y for y in x.strip().split("\t") if y] for x in open("ratings.txt")]
title = [x.replace(" ", "") for x in raw_data[0]]
body = raw_data[1:]

obj = list()
for line in body:
    line = [float(line[0]), int(line[1]), line[2], line[3]]
    obj.append({k: v for k, v in zip(title, line)})

with open("data.json", "w") as fout:
    json.dump(obj, fout)
 