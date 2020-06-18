import React, { useState } from 'react';
import Layout from './Layout'
import SignatureCanvas from 'react-signature-canvas'
import { signout } from '../auth';


const Home = () => {
    const [trimmedDataURL, setTrimmedDataURL] = useState(null)
    // state = { trimmedDataURL: null }
    let sigPad = {}
    const clear = () => {
        // sigPad.clear()
        sigPad.fromDataURL('../user/yyy.jpg')
    }
    const trim = () => {

        setTrimmedDataURL(sigPad.getTrimmedCanvas()
            .toDataURL('image/png'))
        localStorage.setItem('signature', trimmedDataURL)

    }
    const download = () => {
        var element = document.createElement("a");
        var file = new Blob(
            [
                "https://timesofindia.indiatimes.com/thumb/msid-70238371,imgsize-89579,width-400,resizemode-4/70238371.jpg"
            ],
            { type: "image/*" }
        );
        element.href = URL.createObjectURL(file);
        element.download = "image.jpg";
        element.click();
    };
    return (

        <Layout title="Home Page" description="Node React E-commerce App">
            ...

            <SignatureCanvas penColor='green'
                canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }} ref={(ref) => { sigPad = ref }} />
            <button onClick={clear}>
                Clear
        </button>
            <button onClick={trim}>
                Trim
        </button>
            <br />
            {trimmedDataURL
                ? <img
                    src={trimmedDataURL} />
                : null}

            {console.log(localStorage.getItem('signature'))}
            <a
                href="https://timesofindia.indiatimes.com/thumb/msid-70238371,imgsize-89579,width-400,resizemode-4/70238371.jpg"
                download
                onClick={() => download()}
            >
                <i className="fa fa-download" />
                download
      </a>

            {/* {localStorage.getItem('signature') ? <img
                src={localStorage.getItem('signature')} /> : null} */}
        </Layout >

    )
}


export default Home