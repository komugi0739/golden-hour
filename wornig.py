
import auto_make_venv as amv
amv.make_venv(installs=["win11toast","requests"],reboot=True)

import time, requests
from win11toast import notify
print("Searching for koppepan...")
url = "https://map.utopiamc.jp/tiles/players.json"
x=0;y=0;z=0;pos="";yaw=0
while True:
    try:
        response = requests.get(url, timeout=5)
    except requests.exceptions.ReadTimeout:
        time.sleep(2)
        continue
    data = response.json()
    if any(player["name"] == "clione_paradise" for player in data["players"]):
        break
    time.sleep(2)
notify("clione_paradiseが見つかりました。", app_id="a")
print("found!!")
p=1.5
while True:
    try:
        response = requests.get(url, timeout=5)
    except requests.exceptions.ReadTimeout:
        time.sleep(min(1.5,p))
        continue
    data = response.json()
    p+=0.1
    for player in data["players"]:
        if player["name"] == "clione_paradise":
            x=player["x"];y=player["y"];z=player["z"];pos=player["world"];yaw=player["yaw"]
            
        elif pos==player["world"] and abs(x-player["x"])<23 and abs(y-player["y"])<23:
            a=player["yaw"]+yaw
            a=a%360
            notify(f"⚠️{player["name"]}が{a}の方向から接近しています。", app_id="a")
            p=0
    time.sleep(min(1.5,p))