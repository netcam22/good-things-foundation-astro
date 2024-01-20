export async function onRequestGet(context) {
	return await handleRequest(context);
}

async function handleRequest(request) {
    const response = await fetch("https://catfact.ninja/fact");
    const factDetails = await response.json();
    const randomFact = factDetails.fact;
    const pageResponse = await fetch(request);
    const pageBody = await pageResponse.text();
    const updatedBody = pageBody.replace("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", randomFact);
    return new Response(updatedBody, {
        headers: pageResponse.headers,
        status: pageResponse.status,
        statusText: pageResponse.statusText
    });
}