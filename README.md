# GrimoireNG dashboard proof-of-concept based on crossfilter

This is the proof of concept for a software development dashboard based on crossfilter and DC.

## Installation

If you want use it as standalone dashboard, clone the repository and, assuming you already have npm working (and thus node too):

```bash
$ npm install
$ bower install
$ grunt serve
```

This will let you test and develop over your own dashboard version.

If you want to create a _distributable_ dashboard:

```bash
$ grunt build
```

In case you don't have bower or grunt installed, before the above commands, install them by:

```bash
$ sudo npm install -g bower
$ sudo npm install -g grunt
```

The original scaffolding was done with [Yeoman](http://yeoman.io/).
