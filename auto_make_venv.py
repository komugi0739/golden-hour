import os
import sys
import importlib.metadata as met
def make_venv(installs:list=[],name:str="venv",reboot:bool=True)->None:
    if sys.prefix != sys.base_prefix:
        return
    if os.name=="posix":
        if not os.path.isfile("./" + name + "/bin/python"):
            if os.system("python3 -m venv " + name) != 0:
                if os.system("python -m venv " + name) != 0:
                    if os.system("py -m venv " + name) != 0:
                        sys.exit("Error: venvの作成に失敗しました。")

        # Macのサイトパッケージのパスはバージョンごとに異なります（後述の注意点を参照）
        sys.path.append("./" + name + "/lib/site-packages")

        for install in installs:
            try:
                met.version(install)
            except met.PackageNotFoundError:
                if os.system("./" + name + "/bin/python -m pip install " + install) != 0:
                    sys.exit("Error: venvの作成に失敗した、モジュールが存在しない、または何らかの理由によりモジュールのインストールが失敗しました。")

        if reboot:
            os.system("./" + name + "/bin/python " + sys.argv[0])
            sys.exit()
    elif os.name=="nt":
        if not os.path.isfile(".\\"+name+"\\Scripts\\python.exe"):
            if os.system("python3 -m venv "+name)!=0:
                if os.system("python -m venv "+name)!=0:
                    if os.system("py -m venv "+name)!=0:
                        sys.exit("Error: venvの作成に失敗しました。")
        sys.path.append(".\\"+name+"\\Lib\\site-packages")
        for install in installs:
            try:
                met.version(install)
            except met.PackageNotFoundError:
                if os.system(".\\"+name+"\\Scripts\\python.exe -m pip install "+install)!=0:
                    sys.exit("Error: venvの作成に失敗した、モジュールが存在しない、または何らかの理由によりモジュールのインストールが失敗しました。")
        if reboot:
            os.system(".\\"+name+"\\Scripts\\python.exe "+sys.argv[0])
            sys.exit()