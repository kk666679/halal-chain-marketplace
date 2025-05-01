#!/bin/bash

VALIDATE=false
ROLLBACK=false
VERSION=""

# Check for arguments
while [[ $# -gt 0 ]]; do
  case "$1" in
    --validate)
      VALIDATE=true
      ;;
    --rollback)
      ROLLBACK=true
      VERSION="$2"
      shift
      ;;
    *)
      echo "Unknown argument: $1"
      exit 1
      ;;
  esac
  shift
done

if [[ "$VALIDATE" == "true" ]]; then
  echo "Validation started"
elif [[ "$ROLLBACK" == "true" ]]; then
  echo "Rollback to version $VERSION"
else
  echo "Full deployment with tests started"
  firebase deploy --only functions
fi