import React, { useState } from 'react';
import './App.css'; // Import your CSS file
import axios from 'axios';
import { Audio } from 'react-loader-spinner'

const App = () => {
  const [inputText, setInputText] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState('dall-e-2');
  const [numberOfImages, setNumberOfImages] = useState(1);
  const [size, setSize] = useState('1024x1024');


  const generateImage = () => {
    // Call API to get the image URL

    const OPENAI_API_KEY = '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'; //OpenAI API key

    const apiUrl = 'https://api.openai.com/v1/images/generations';

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    };

    const data = {
      model: model,
      prompt: inputText,
      n: numberOfImages,
      size: size
    };
    setIsLoading(true);
    axios.post(apiUrl, data, { headers })
      .then(response => {
        console.log('Response:', response.data);
        setGeneratedImage(response.data.data[0].url);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error.response.data);
      });
  };

  return (
    <div className="container">
      <textarea
        placeholder="Text to image"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        rows={4}
      />

      {/* Model Selection */}
      <div className="radio-group">
        <div className="radio-group-label">Model:</div>
        <label>
          <input
            type="radio"
            value="dall-e-2"
            checked={model === 'dall-e-2'}
            onChange={() => setModel('dall-e-2')}
          />
          DALL-E 2
        </label>

        <label>
          <input
            type="radio"
            value="dall-e-3"
            checked={model === 'dall-e-3'}
            onChange={() => setModel('dall-e-3')}
          />
          DALL-E 3
        </label>
      </div>

      {/* Size Selection */}
      <div className="radio-group">
        <div className="radio-group-label">Size:</div>
        {model === 'dall-e-2' && (
          <>
            <label>
              <input
                type="radio"
                value="256x256"
                checked={size === '256x256'}
                onChange={() => setSize('256x256')}
              />
              256x256
            </label>

            <label>
              <input
                type="radio"
                value="512x512"
                checked={size === '512x512'}
                onChange={() => setSize('512x512')}
              />
              512x512
            </label>

            <label>
              <input
                type="radio"
                value="1024x1024"
                checked={size === '1024x1024'}
                onChange={() => setSize('1024x1024')}
              />
              1024x1024
            </label>
          </>
        )}

        {model === 'dall-e-3' && (
          <>
            <label>
              <input
                type="radio"
                value="1024x1024"
                checked={size === '1024x1024'}
                onChange={() => setSize('1024x1024')}
              />
              1024x1024
            </label>

            <label>
              <input
                type="radio"
                value="1792x1024"
                checked={size === '1792x1024'}
                onChange={() => setSize('1792x1024')}
              />
              1792x1024
            </label>

            <label>
              <input
                type="radio"
                value="1024x1792"
                checked={size === '1024x1792'}
                onChange={() => setSize('1024x1792')}
              />
              1024x1792
            </label>
          </>
        )}
      </div>

      <button onClick={generateImage}>Generate</button>

      {isLoading && (
        <div className="loader-container">
          <Audio height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="three-dots-loading"
            wrapperStyle
            wrapperClass />
        </div>
      )}

      {generatedImage && (
        <div className="image-container">
          <img src={generatedImage} alt="Generated" />
        </div>
      )}
    </div>
  );
};

export default App;
