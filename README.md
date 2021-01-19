---
### https://material-ui.com/components/material-icons/

### https://github.com/pmndrs/jotai

### https://mailtrap.io/inboxes/1116006/messages/2037420267

### https://blocks.wickedtemplates.com/navigation

### https://tailwindtemplates.io

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
## set input focus with React-Hook-Form
---

import React, { useRef } from "react"
import useForm from "react-hook-form"

function App() {
const { register, handleSubmit } = useForm()
const firstNameRef = useRef<HTMLInputElement>()
const onSubmit = data => alert(JSON.stringify(data))

return (
<form onSubmit={handleSubmit(onSubmit)}>
<input name="firstName" ref={(e: HTMLInputElement) => {
register(e)
firstNameRef.current = e // you can still assign to your own ref
}} />
<input name="lastName" ref={(e) => {
// register's first argument is ref, and second is validation rules
register(e, { required: true })
}} />

      <button>Submit</button>
    </form>

);
}

---
