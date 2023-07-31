import GoogleAnalytics from "./GoogleAnalytics";

// Scripts라는 컴포넌트로 한 단계 추상화 하여 호출한다.
// 여러 Script 들을 아래에 삽입하면 된다.
const Scripts = () =>{
    return (
        <>
            <GoogleAnalytics/>
        </>
    )
}

export default Scripts;