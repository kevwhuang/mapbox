import type { MiddlewareHandler } from 'astro';

const onRequest: MiddlewareHandler = async (context, next) => {
    const res = await next();
    if (context.isPrerendered) return res;

    res.headers.set('access-control-allow-origin', 'https://k-astro.netlify.app');
    res.headers.set('content-security-policy', 'block-all-mixed-content');
    res.headers.set('permissions-policy', 'geolocation=(self), microphone=(self)');
    res.headers.set('referrer-policy', 'same-origin');
    res.headers.set('x-content-type-options', 'nosniff');
    res.headers.set('x-frame-options', 'sameorigin');

    return res;
};

export { onRequest };
