# react-learning-2


`mkdir client`
`mkdir server`

`cd client`
`mkdir src`
`npm init client`
`npm i webpack --save-dev`
`npm i webpack-cli --save-dev`

Inside `package.json`

```
"scripts": {
  "build": "webpack --mode production"
}
```
Istall Babel with preset-env(ES6 to ES5) and preset-react
`npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev`

Create `.babelrc` :
```
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```
Create `webpack.config.js`:
``` 
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
```

Installing React:
`npm i react react-dom --save-dev`
Installing PropTypes(good practice):
`npm i prop-types --save-dev`
To include the generated js file in an html two webpack plugins are needed:
`npm i html-webpack-plugin html-loader --save-dev`
To use Webpack dev server to reload app in browser everytime something changes:
`npm i webpack-dev-server --save-dev`




https://www.valentinog.com/blog/react-webpack-babel/
