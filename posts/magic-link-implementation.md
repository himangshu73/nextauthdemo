---
title: "Next-Auth Magic Link Implementation"
date: "2025-07-06"
---

In the last few days, I implemented magic link authentication and password recovery through email for credentials user for my site.

## Magic Link Authentication Flow

- User request for authentication link in their email
- User get authentication link in the mail
- New users are registered
- Link is valid for some mins
- User can request for new link after cooldown timer
- Database adapter is required for Magic Link

## Password Recovery for Credentials users

- User click on forgot password
- Enter their email and request password reset link
- Only credentials user can request for password reset link
