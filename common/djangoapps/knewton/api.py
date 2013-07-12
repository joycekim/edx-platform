#used for making http reqs
import requests

from django.shortcuts import redirect

import logging
log = logging.getLogger("tracking")
""" all knewton stuff here """

SessionData = {
    'auth_header': None,
    'learning_instance_id': 'fe4e4984-e327-11e2-be28-23000a977c8e',
    'username': 'test_sandcastle_student_07022013105931',
    'password': '9m0o8v475lja04jz05mmtb1z2z2ry3ri',
    'registration_id': 'ff2c2ab0-e327-11e2-a796-1331380b64fb',
    'account_id': 'fef46026-e327-11e2-a796-1331380b64fb',
    'goal_id': '914e03f7-e194-42b8-a192-c601b2e6e5c4',
    'teaching_module_id': '1c6bf015-c3f2-417f-a1ee-133d97a5742d',
    'assessing_module_id': 'bd56cb74-cbc3-4f6f-b9e7-895e97117b29',
    }

def knewton_session_data():
    """ stuff we need to make reqs against knewton api"""
    return SessionData

def send_graded_event(event):
  """ TODO """
  log.info('send_graded_event called')

  return True

def send_ungraded_event(event):
  """ TODO """
  log.info('send_ungraded_event called')
  return True

def send_event(event):
  """ This figures out the event type, and chooses send_graded_event or send_ungraded_event"""
  return send_graded_event(event)

def oauth_flow(request):
  return redirect('https://bivins-apiuat.r.staging.knewton.com/v0/oauth/authorize?client_id=knewton&response_type=code&redirect_uri=https://192.168.20.40:8000%2Fknewton-recieve-auth-grant')

