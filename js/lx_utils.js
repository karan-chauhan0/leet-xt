const browser = chrome || browser;

const update_message = 'Please update Leet Xt to the latest version';

async function isActivated() {
    if(!browser.storage) return true;
    let data = await browser.storage.local.get('activated');
    return data.activated;
}

function nextPageType() {
    if (document.title.startsWith('friends')) return 'friends';
    if (document.title.endsWith('LeetCode Profile')) return 'profile';
    if (document.title.endsWith('Learning Platform')) return 'problem';
    if (document.title.startsWith('Problems')) return 'problemset';
    return 'other';
}

function mutObserve(node, callback) {
    if (!node) alert(update_message);
    const observer = new MutationObserver(callback);
    observer.observe(node, { childList: true, subtree: true })
}

async function makeRequest(url, data) {
    const method = data ? 'POST' : 'GET';
    data = data || {};
    try {
        let config = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        }
        if (method === 'POST') config.body = JSON.stringify(data);
        const response = await fetch(url, config);
        if (!response.ok) alert(update_message);
        return await response.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}


/***** FRIENDS */

function addFriend(username, myfriends) {
    myfriends.push(username);
    browser.storage.local.set({ 'myfriends': myfriends }, function () {
        // console.log('ADDED FRIEND ' + myfriends);
    });
}

function removeFriend(username) {
    browser.storage.local.get('myfriends', function (result) {
        myfriends = result.myfriends;
        myfriends = myfriends.filter(e => e !== username);
        browser.storage.local.set({ 'myfriends': myfriends }, function () {
            // console.log('REMOVED FRIEND ' + myfriends);
        });
    });
}

function clearFriends() {
    browser.storage.local.set({ 'myfriends': [] }, function () {
        // console.log('CLEARED FRIENDS');
    });
}