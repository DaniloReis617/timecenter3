#!/bin/bash

# Activate the virtual environment
source myenv/bin/activate

# Upgrade pip
pip install --upgrade pip

# Install setuptools and wheel
pip install setuptools wheel

# Install the requirements
pip install -r requirements.txt