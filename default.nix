# ~/mhp/default.nix
{ pkgs ? import <nixpkgs> {} }:

let
  nodejs = pkgs.nodejs-18_x;
  yarn = pkgs.yarn;

  nodePackages = with pkgs.nodePackages; [
    dom
    jest-dom
    react
    user-event
    web-vitals
    firebase-auth
    heroicons-react
    react-three-fiber
    stripe-react-stripe-js
    stripe-stripe-js
    truffle-contract
    axios
    bcryptjs
    cors
    dotenv
    drei
    ethereumjs-tx
    express
    firebase
    i18next
    i18next-http-backend
    jsonwebtoken
    mongoose
    react-i18next
    react-router-dom
    react-select
    socket.io
    stripe
    web3
  ];

in pkgs.mkShell {
  buildInputs = [
    nodejs
    yarn
    pkgs.git
    pkgs.jq
    pkgs.curl
    pkgs.openssl.bin
  ] ++ nodePackages;

  shellHook = ''
    echo "Environment ready with:"
    echo "- Node.js $(node --version)"
    echo "- OpenSSL $(openssl version)"
  '';
}
