import Script from 'next/script'

const GoogleAnalytics = () =>{
    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA}`}
                strategy='afterInteractive'
            />

            <Script id="" strategy='afterInteractive'>
                {
                    `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', '${process.env.GA}');
                    `
                }
            </Script>
        </>
    )
}

export default GoogleAnalytics;