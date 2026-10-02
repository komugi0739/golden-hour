import time
from win10toast import ToastNotifier

toaster = ToastNotifier()

# 💡 durationを60秒にし、threaded=Trueでバックグラウンドで実行し続けます
toaster.show_toast(
    "通知テスト",
    "この通知が出ている間に設定を確認してください",
    duration=60,
    threaded=True
)

print("60秒間バックグラウンドで通知を実行中... 設定画面を開いてください。")

# プログラムがすぐ終了しないように待機
time.sleep(60)
