import os
import channels.asgi


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "bukkake.settings_production")

channel_layer = channels.asgi.get_channel_layer()
