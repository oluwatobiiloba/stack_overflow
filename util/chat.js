const { DefaultAzureCredential } = require("@azure/identity");
const { CommunicationIdentityClient } = require('@azure/communication-identity');


const connectionString = "endpoint=https://stacklite.communication.azure.com/;accesskey=yCmjWLtfFep2pNzwHQ0wnPzHmWoVBe58uATwk0TXvkcQm12XCKyL8GKqumaCijAuYEAzXyRVxZ4pZB7RYx+Amw=="
const endpoint = "https://stacklite.communication.azure.com/"
const identityClient = new CommunicationIdentityClient(connectionString);
async function getAccessToken() {
    try {
        // Issue an identity and an access token with a validity of 24 hours and the "voip" scope for the new identity
        let identityTokenResponse = await identityClient.createUserAndToken(["chat"], { tokenExpiresInMinutes: 1440 });
        // Get the token, its expiration date, and the user from the response
        const { token, expiresOn, user } = identityTokenResponse;
        console.log(expiresOn);
        // const identityResponse = { communicationUserId: user.communicationUserId };
        // let refreshedTokenResponse = await identityClient.getToken(identityResponse, ["voip"]);
        // console.log(refreshedTokenResponse)
        return token;
    } catch (error) {
        console.error(error);
    }
}

async function chat() {
    const { ChatClient } = require("@azure/communication-chat");
    const { AzureCommunicationTokenCredential } = require("@azure/communication-common");
    const token = await getAccessToken();
    const tokenCredential = new AzureCommunicationTokenCredential(token);
    const client = new ChatClient(endpoint, tokenCredential);
    console.log(client)

    async function createChatThread() {
        try {
            const threadId = await client.createChatThread({ topic: "My chat thread" });
            console.log(`Chat thread created with ID: ${threadId}`);
            return threadId;
        } catch (error) {
            console.error(error);
        }
    }

    async function testSendMessage() {
        const token = await getAccessToken();
        const tokenCredential = new AzureCommunicationTokenCredential(token);
        const client = new ChatClient(endpoint, tokenCredential);
        const threadId = await createChatThread();
        const messageId = await client.sendMessage(threadId, "Test message");
        console.log("Message sent with ID:", messageId);
    }


    // az communication identity token issue--scope chat--connection - string 'endpoint=https://stacklite.communication.azure.com/;accesskey=yCmjWLtfFep2pNzwHQ0wnPzHmWoVBe58uATwk0TXvkcQm12XCKyL8GKqumaCijAuYEAzXyRVxZ4pZB7RYx+Amw=='

    async function listenForMessages(threadId) {
        const iterator = client.listMessages(threadId);
        for await (const message of iterator) {
            console.log(`New message received: ${message.content}`);
        }
    }


    const threadId = await createChatThread();
    console.log(threadId)
    await testSendMessage()

}

chat()
