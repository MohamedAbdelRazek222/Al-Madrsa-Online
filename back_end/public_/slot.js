const form = document.getElementById("slotForm");
const scheduleBtn = document.getElementById("schedule_zoom");
const startBtn = document.getElementById("start_zoom");

async function sendJson(url, json, method) {
    const fetchOptions = {
        method,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(json),
    };

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage);
    }

    return response.json();
}

async function submitFormData(data, url, namesToExclude, method) {
    try {
        console.log(namesToExclude)

        for (const name of namesToExclude) {
            delete data[name];
        }

        console.log("submitting data", { data });
        const responseData = await sendJson(url, data, method);

        console.log({ responseData });
        console.log("Data saved successfully");
        return responseData;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

function getFormData(form) {
    return Object.fromEntries(new FormData(form).entries());
}

async function submitForm(e) {
    e.preventDefault();
    const data = getFormData(e.currentTarget);
    data["start_time"] = !data["start_time"] ? "" : new Date(data["start_time"]).toISOString();
    const url = "/slot";
    const namesToExclude = ["slot_id"];
    const response = await submitFormData(data, url, namesToExclude, "POST");
    document.getElementById("slot_id").value = response._id;
}

// if (no) {
//     try with set internal { 
//         getting access token from cookei every 5 seconds
//         then post to zoom /create meeting then put meeting id join url in /slot 
//         then get /slot and update form
//     }

//     open get /zoomapi/token in a new tab
// } else {
//         post to zoom /create meeting then put meeting id join url in /slot 
//         then get /slot and update form
// }


function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}

let interval;
let counter = 0;
async function scheduleZoomMeeting(e) {
    if (interval) {
        return;
    }

    const access_token = getCookie("access_token");
    if (!access_token) {
        window.open("/zoomapi/token", '_blank');
    }

    interval = setInterval(async () => {
        if (++counter > 10) {
            clearInterval(interval);
            interval = undefined;
            counter = 0;
        }

        const access_token = getCookie("access_token");
        if (!access_token) {
            return;
        }

        try {
            const access_token_string = "Bearer " + access_token;
            console.log("access_tokennn:", access_token_string);
            let data = getFormData(form);
            data["start_time"] = !data["start_time"] ? "" : new Date(data["start_time"]).toISOString();
            data["access_token"] = access_token_string;
            let namesToExclude = [];
            let response = await submitFormData(data, "/zoomapi/createMeeting", namesToExclude, "POST");
            console.log(response);

            document.getElementById("meeting_id").value = response.id;
            document.getElementById("join_url").value = response.join_url;

            // update slot id
            data = getFormData(form);
            data["start_time"] = !data["start_time"] ? "" : new Date(data["start_time"]).toISOString();
            namesToExclude = ["slot_id"];
            response = await submitFormData(data, `/slot/${data["slot_id"]}`, namesToExclude, "PUT");
            console.log(response);
        } catch (e) {
            document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            alert("error happened, try again");
        } finally {
            // clean up
            clearInterval(interval);
            interval = undefined;
            counter = 0;
        }
    }, 5000);
}

async function startZoomMeeting(e) {
    if (interval) {
        return;
    }

    const access_token = getCookie("access_token");
    if (!access_token) {
        window.open("/zoomapi/token", '_blank');
    }

    interval = setInterval(async () => {
        if (++counter > 10) {
            clearInterval(interval);
            interval = undefined;
            counter = 0;
        }

        const access_token = getCookie("access_token");
        if (!access_token) {
            return;
        }

        try {
            const access_token_string = "Bearer " + access_token;
            console.log("access_tokennn:", access_token_string);
            let data = getFormData(form);
            data["start_time"] = !data["start_time"] ? "" : new Date(data["start_time"]).toISOString();
            data["access_token"] = access_token_string;
            let namesToExclude = [];
            let response = await submitFormData(data, "/zoomapi/meetingStartUrl", namesToExclude, "POST");
            console.log(response);

            document.getElementById("start_url").value = response.start_url;

            // update slot id
            data = getFormData(form);
            data["start_time"] = !data["start_time"] ? "" : new Date(data["start_time"]).toISOString();
            namesToExclude = ["slot_id"];
            response = await submitFormData(data, `/slot/${data["slot_id"]}`, namesToExclude, "PUT");
            console.log(response);
        } catch (e) {
            document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            alert("error happened, try again");
        } finally {
            // clean up
            clearInterval(interval);
            interval = undefined;
            counter = 0;
        }
    }, 5000);
}

form.addEventListener("submit", submitForm);
scheduleBtn.addEventListener("click", scheduleZoomMeeting);
startBtn.addEventListener("click", startZoomMeeting);
