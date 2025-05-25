---
title: "Nextjs session data render problem"
date: "2025-05-25"
---

### Using getServerSession in navbar

Page is loaded with login status. For example, if the user is logged in, it will render username, logout button during page load. 

There is no delay. But, if user clicks logout button, the user is logged out but UI is not updated. Same case for login. 

After successfull login, the UI is not updated untill the component reload. 

As getServerSession does not load the UI after user click event, I have to use useSession to update session data.

### Using useSession in navbar

Page is loaded but user status is still loading. which enforces to show loading text or icon or blank. 

If not showing loading text or icon or blank then login button is still visible. User experience is not good.

### Solution

To solve these issues, I used both getServerSession in layout and useSession in the navbar component. So the page loads with the session data and UI is changed instantly when a user is logged in and logout.