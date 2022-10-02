# Instagram Autofollow Bot
 Hi!, this is an instagram bot that autofollows from alter account  when someone request to follow you 
 
## Installation
```bash
> npm i
```

## Usage
First you need to edit config.json file!
You can add more bots accounts!
```json
{   
    "instagram": {
        "username": "username",
        "password": "password"
    },
    "bots": [
        {
            "username": "username",
            "password": "password"
        },
        {
            "username": "username",
            "password": "password"
        }
    ],
    "proxy": {
        "enabled": false,
        "hosts": [
            "http://{proxy}:{port}",
            "http://{proxy}:{port}",
            "http://{proxy}:{port}",
            "http://{proxy}:{port}"
        ]
    },
    "timeout": 15
}
```

After that:
```bash
> node index.js
```
