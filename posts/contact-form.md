---
title: "Creating a Contact Form"
date: "2025-07-02"
---

My website himangshu.xyz has a **contact** menu in the navbar. But I was busy with my other projects that I never got to create the page. Finally I decided to complete the contact form page so that I can receive email from anyone who uses the form.

## Design The Contact Form

Desiging the contact form was very straight-forward. I used react-hook-form from shadcn and some components froms shadcn ui (e.g. Input, Textarea) to create a minimal design contact me form. I create a zod validation schema to validate the input data.

## API Route To Send Email

I used **Resend email** to that I can receive email to may gmail inbox when someone sends a message through the form.

## React Email For Email Template

I used React Email to design the body of the email. I found a small bug when using the React Email component. Finally found that I have to use _.tsx_ for email template using React Email components.

Finally, I pushed the code to github. I was unable to send message from production. But on dev, it was working fine. Then I found out that I forgot to add environment variable to vercel. I fixed it and everything is working fine.

It was good learning curve.
