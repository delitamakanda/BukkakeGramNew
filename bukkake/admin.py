from django.contrib import admin
from bukkake.models import ChatMessage, Bukkake, Comment
from bukkake.forms import AdminChatMessageForm

# Register your models here.
@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    form = AdminChatMessageForm
    list_display = ('user', 'message', 'message_html', 'updated', 'created',)

class BukkakeAdmin(admin.ModelAdmin):
    list_display = ['title', 'slug', 'image', 'created', 'updated']
    list_filter = ['created', 'updated']


class CommentAdmin(admin.ModelAdmin):
    list_display = ['commented_by', 'created_on']

admin.site.register(Bukkake, BukkakeAdmin)
admin.site.register(Comment, CommentAdmin)
