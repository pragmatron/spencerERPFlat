    console.log('context payload: ', context.payload)
try{
    //let base64 = context.payload.base64data.substr(context.payload.base64data.indexOf(',')+1)
  let msg = {
        to: /*context.payload.email ||*/ 'rorymcdonnell95@gmail.com',
        from: 'rorymcdonnell95@gmail.com',
        subject: 'Quote Recieved',
       html: `<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
   <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Quote</title>
  </head>
  <body>
    <p>Hi,</p>
    <p>Please process the attached order.</p>
    <p>Kind regards,<br /></p>
  </body>
</html>`,
        attachments: [
            {
            content:context.pdf || '',
            filename: `Quote.pdf`,
            type: "application/pdf",
            disposition: "attachment"
            }
        ],

    }
context.data.response = msg
    sgMail
        .send(msg)
        .then((response) => {
            console.log('email sent!')
            $log(response[0].statusCode)
            $log(response[0].headers)
            context.data.response = response[0].headers
        })
        .catch((error) => {
            console.log(error)
            context.data.error = error
            $log(error)
            $log('Something went wrong sending the confirmation email')
        })
     $addRow('outgoingEmails', {
        name: 'Quote Recieved',
        body: msg.html,
        quote: context.payload.rowKey,
        email: msg.to
     }).then((rowKey) => {
         uploadFilesToRecord({
            workspaceId: '-Nnj6gGspBmEsMcC7I1t', // string value of the workspace id
            gridId: 'outgoingEmails', // string value of the dashboard id
            rowKey: rowKey, // string value of rowKey of the record
            cellKey: 'attachments', // name of the file type field
            files: msg.attachments.map((attachment) => {
                return {
                    name: attachment.filename,
                    data: Buffer.from(context.pdf, 'base64')
                }
            })
        })
     })
// for(const email of context.payload.salesGroup) {
    // if(email) {
    // const salesGroupMsg = {
    // to: /*email  ||*/ 'rorymcdonnell95@gmail.com',
    // from: 'rorymcdonnell95@gmail.com',
    // subject: 'Sales Order Recieved',
    // html: `<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
    // <head>
    // <meta charset="UTF-8" />
    // <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    // <title>Order Confirmation</title>
    // </head>
    // <body>
    // <h2>CC:</h2>
    // <p>Hi ,</p>
    // <p>Please process the attached order and send back a confirmation email with the lead time to ${context.payload.buyerEmail}.</p>
    // <p>Have a lovely day!</p>
    // <p>Thanks,<br /></p>
    // </body>
    // </html>`,
    // attachments: [
    //     {
    //     content: context.pdf || '',
    //     filename: `Sales-Order.pdf`,
    //     type: "application/pdf",
    //     disposition: "attachment",
    //     },
    // ],
    // }
    // sgMail.send(salesGroupMsg).then((response) => {
    //     console.log('email sent!')
    //     $log(response[0].statusCode)
    //     $log(response[0].headers)
    //     context.data.response = response[0].headers
    // }).catch((error) => {
    //     console.log(error)
    //     context.data.error = error
    //     $log(error)
    //     $log('Something went wrong sending the confirmation email')
    // })

    // $addRow('outgoingEmails', {
    //     name: 'CC: Sales Order Recieved',
    //     body: salesGroupMsg.html,
    //     salesOrder: context.payload.rowKey,
    //     email: email
    // }).then((rowKey) => {
    //     uploadFilesToRecord({
    //         workspaceId: '-NfjN9vPABMrcsMP4zWW', // string value of the workspace id
    //         gridId: 'outgoingEmails', // string value of the dashboard id
    //         rowKey: rowKey, // string value of rowKey of the record
    //         cellKey: 'attachments', // name of the file type field
    //         files: salesGroupMsg.attachments.map((attachment) => {
    //             return {
    //                 name: attachment.filename,
    //                 data: Buffer.from(context.pdf, 'base64')
    //             }
    //         })
    //     })
    // })
    

} catch(err) {
    console.log(err)
    $log(err.message)
    $log('Something went wrong sending the confirmation email')
    context.data.error = err
}