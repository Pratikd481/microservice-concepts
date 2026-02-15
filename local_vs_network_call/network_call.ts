
async function getUserProfile(id: number) {
    const response = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
    });

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }

    return response.json();
}

console.time("http");


(async () => {
    for (let i = 0; i < 10; i++) {
        try {
            //const profile = await getUserProfile(2);
            const profile = await getUserProfileWithRetry(5, getUserProfile);
            console.log(profile);
        } catch (error) {
            throw error;
        }
    }
    console.timeEnd("http");
})();


async function getUserProfileWithRetry(retryCount: number = 5, cb: (id: number) => Promise<any>): Promise<any> {
    for (let i = 0; i < retryCount; i++) {
        try {
            //retry with exponential backoff
            // if (i > 0) {
            //     const backoffDelay = Math.pow(2, i) * 1000; // Exponential backoff in milliseconds
            //     console.log(`Attempt ${i + 1} to fetch user profile...`);
            //     await new Promise(resolve => setTimeout(resolve, backoffDelay));
            // }
            //retry with jitter
            if (i > 0) {
                const backoffDelay = Math.pow(2, i) * 1000; // Exponential backoff in milliseconds
                const jitter = Math.random() * 1000; // Random jitter up to 1 second
                const totalDelay = backoffDelay + jitter;
                console.log(`Attempt ${i + 1} to fetch user profile...`);
                await new Promise(resolve => setTimeout(resolve, totalDelay));
            }
            return await cb(2);
        } catch (error) {
            //console.error(`Attempt ${i + 1} failed:`, error);
            if (i === retryCount - 1) throw error;
        }
    }
}

