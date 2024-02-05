export async function onRequestGet(context) {
    return await handleRequest(context);
}

async function handleRequest(context) {
    const catResponse = await fetch("https://catfact.ninja/fact");
    const factDetails = await catResponse.json();
    const randomFact = factDetails.fact;
    const url = new URL(context.request.url);
    const asset = await context.env.ASSETS.fetch(url);
    const assetText = await asset.text();
    const newAssetText = assetText.replace("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", randomFact);
    const response = new Response(newAssetText, {
        headers: {
        "content-type": "text/html;charset=UTF-8",
        },
        status: 200,
    });
    if(response.status === 200) {
        return response;
    }
    else {
        return new Response(assetText, asset);
    }
}