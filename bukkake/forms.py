import ssl
import bleach
import markdown
import re

from urllib.request import urlopen, Request
from django.utils.html import escape
from django.core.files.base import ContentFile
from django.utils.text import slugify
from django.core.validators import RegexValidator
from django import forms
from bukkake.models import Bukkake, ChatMessage, Comment
from django.conf import settings

class BukkakeCreateForm(forms.ModelForm):

    class Meta:
        model = Bukkake
        fields = ('title', 'url', 'description',)
        widget = {
            'url': forms.HiddenInput,
        }

    def clean_url(self):
        url = self.cleaned_data['url']
        valid_extensions = ['jpg', 'jpeg'] # png or gif not permit due to Pillow restrictions
        extension = url.rsplit('.', 1)[1].lower()
        if extension not in valid_extensions:
            raise forms.ValidationError('The given URL does not match valid image extensions.')
        return url

    def save(self, force_insert=False, force_update=False, commit=True):
        image = super(BukkakeCreateForm, self).save(commit=False)
        image_url = self.cleaned_data['url']
        image_name = '{}.{}'.format(slugify(image.title), image_url.rsplit('.', 1)[1].lower())

        # download image from the url
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        req = Request(image_url, headers={'User-Agent': 'Mozilla/5.0'})
        response = urlopen(req, context=ctx)
        image.image.save(image_name, ContentFile(response.read()), save=False)

        if commit:
            image.save()
        return image


class CommentModelForm(forms.ModelForm):
    bukkake_pk = forms.IntegerField(widget=forms.HiddenInput)
    parent_comment_pk = forms.IntegerField(widget=forms.HiddenInput, required=False)

    class Meta:
        model = Comment
        labels = {
            'body': 'Write a comment'
        }
        fields = ('body',)


class AdminChatMessageForm(forms.ModelForm):

    class Meta:
        model = ChatMessage
        fields = ['user', 'message', 'message_html']

    def clean(self):
        message = self.cleaned_data['message']

        message_html = escape(message)

        urlRegex = re.compile(
                u'(?isu)(\\b(?:https?://|www\\d{0,3}[.]|[a-z0-9.\\-]+[.][a-z]{2,4}/)[^\\s()<'
                u'>\\[\\]]+[^\\s`!()\\[\\]{};:\'".,<>?\xab\xbb\u201c\u201d\u2018\u2019])'
            )
        processed_urls = list()
        for obj in urlRegex.finditer(current_message):
            old_url = obj.group(0)
            if old_url in processed_urls:
                continue
            processed_urls.append(old_url)
            new_url = old_url
            if not old_url.startswith(('https://', 'http://')):
                new_url = 'http://' + new_url
            new_url = '<a href="'+ new_url + '">' + new_url + '</a>'
            message_html = message_html.replace(old_url, new_url)

        self.cleaned_data['message_html'] = message_html

        return self.cleaned_data

