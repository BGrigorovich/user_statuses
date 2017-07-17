import json

from channels import Group


def ws_add(message):
    message.reply_channel.send({'accept': True})
    Group('users').add(message.reply_channel)


def ws_message(message):
    Group('users').send({'text': json.dumps(message)})


def ws_disconnect(message):
    Group('users').discard(message.reply_channel)
