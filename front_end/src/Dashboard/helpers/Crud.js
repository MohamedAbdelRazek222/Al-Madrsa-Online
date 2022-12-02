
// get
export const get = (url) => fetch(url, {
    credentials: 'same-origin',
    headers: {
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
    },
    mode: 'cors'
}).then((res) => res.json());

// add
export const add = (url, body) => fetch(url, {
    credentials: 'same-origin',
    mode: 'cors',
    method: "post",
    headers: { 
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json" },
    body: JSON.stringify(body)
}).then((res) => res.json());


// update
export const put = (url, body) => fetch(url, {
    credentials: 'same-origin',
    mode: 'cors',
    method: "put",
    headers: { 
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json" 
    },
    body: JSON.stringify(body)
}).then((res) => res.json());


// delete
export const del = (url) => fetch(url, {
    credentials: 'same-origin',
    mode: 'cors',
    headers: {
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
    },
    method: "delete"
}).then((res) => res.json());

