const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.json({
        Documentation: {
            Routes: {
                "/": {
                    Methods: "GET",
                    Params: null
                },
                "/auth/register": {
                    Methods: "POST",
                    Params: {
                        username: "user",
                        password: "pass"
                    }
                },
                "/auth/login": {
                    Methods: "POST",
                    Params: {
                        username: "user",
                        password: "pass"
                    }
                },
                "/client": {
                    Methods: "GET",
                    Params: null
                },
                "/admin/messages": {
                    Methods: "POST",
                    Params: {
                        id: "messageid"
                    }
                },
                "/admin/messages/send": {
                    Methods: "POST",
                    Params: {
                        text: "message text"
                    }
                }
            }
        }
    })
})

module.exports = router;