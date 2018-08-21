# Geneea Intent API integration for Wingbot

Use the Geneea NLP in wingbot chatbot
## Installing

```
npm i -S wingbot-geneea
```

## Usage

```javascript

const { GeneeaModel } = require('wingbot-geneea');
const { ai } = require('wingbot');

const geneeaModel = new GeneeaModel({
    model: 'name-of-your-model',
    authorization: 'Basic'
});

ai.register(geneeaModel);
```

-----------------

# API
## Classes

<dl>
<dt><a href="#GeneeaModel">GeneeaModel</a></dt>
<dd><p>AI Plugin Model</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Entity">Entity</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#Intent">Intent</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="GeneeaModel"></a>

## GeneeaModel
AI Plugin Model

**Kind**: global class

* [GeneeaModel](#GeneeaModel)
    * [new GeneeaModel(options, [log])](#new_GeneeaModel_new)
    * [.resolve(text)](#GeneeaModel+resolve) ⇒ <code>Promise.&lt;Array.&lt;Intent&gt;&gt;</code>

<a name="new_GeneeaModel_new"></a>

### new GeneeaModel(options, [log])

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> |  |
| options.authorization | <code>string</code> | the authorization header |
| options.model | <code>string</code> | model name (part of the url) |
| [options.cacheSize] | <code>number</code> |  |
| [options.serviceUrl] | <code>string</code> |  |
| [log] | <code>Object</code> | logging function |

<a name="GeneeaModel+resolve"></a>

### geneeaModel.resolve(text) ⇒ <code>Promise.&lt;Array.&lt;Intent&gt;&gt;</code>
**Kind**: instance method of [<code>GeneeaModel</code>](#GeneeaModel)

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | the user input |

<a name="Entity"></a>

## Entity : <code>Object</code>
**Kind**: global typedef

| Param | Type |
| --- | --- |
| name | <code>string</code> |
| type | <code>string</code> |

<a name="Intent"></a>

## Intent : <code>Object</code>
**Kind**: global typedef

| Param | Type |
| --- | --- |
| intent | <code>string</code> |
| score | <code>number</code> |
| [entities] | [<code>Array.&lt;Entity&gt;</code>](#Entity) |

