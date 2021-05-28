# HEIC to JPG Converter

Converts heic files to jpeg. If argument is directory, converts all heic files in it to jpeg.

## Installation

```sh
npm install -g heic-to-jpg
```

Or run:

```sh
npx heic-to-jpg
```

## Usage

Accepts a single argument: a file or directory path. If a file, converts that file; if a folder, converts all _.HEIC files in it. Will throw if a file type other than _.HEIC is entered or if something other than a valid file or folder path is entered.
