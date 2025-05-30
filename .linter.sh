#!/bin/bash
cd /home/kavia/workspace/code-generation/legalconnect-india-26805-3c1ca102/legalconnect_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

