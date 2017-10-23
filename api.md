## Classes

<dl>
<dt><a href="#Blueprint">Blueprint</a></dt>
<dd><p>Class representing a Blueprint resource</p>
</dd>
<dt><a href="#Breed">Breed</a></dt>
<dd><p>Class representing a Breed resource</p>
</dd>
<dt><a href="#Deployment">Deployment</a></dt>
<dd><p>Class representing a Deployment resource</p>
</dd>
<dt><a href="#Event">Event</a></dt>
<dd><p>Class representing an Event</p>
</dd>
<dt><a href="#Gateway">Gateway</a></dt>
<dd><p>Class representing a Gateway resource</p>
</dd>
<dt><a href="#Workflow">Workflow</a></dt>
<dd><p>Class representing a Workflow resource</p>
</dd>
</dl>

<a name="Blueprint"></a>

## Blueprint
Class representing a Blueprint resource

**Kind**: global class  

* [Blueprint](#Blueprint)
    * [new Blueprint(http)](#new_Blueprint_new)
    * [.list()](#Blueprint+list) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.get(name)](#Blueprint+get) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.create(blueprint)](#Blueprint+create) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.delete(name)](#Blueprint+delete) ⇒ <code>Promise.&lt;Object&gt;</code>

<a name="new_Blueprint_new"></a>

### new Blueprint(http)

| Param | Type | Description |
| --- | --- | --- |
| http | <code>object</code> | instantiated axios client |

<a name="Blueprint+list"></a>

### blueprint.list() ⇒ <code>Promise.&lt;Array&gt;</code>
Get a list of blueprints

**Kind**: instance method of [<code>Blueprint</code>](#Blueprint)  
<a name="Blueprint+get"></a>

### blueprint.get(name) ⇒ <code>Promise.&lt;Object&gt;</code>
Describes a single blueprint resource

**Kind**: instance method of [<code>Blueprint</code>](#Blueprint)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | name of the blueprint |

<a name="Blueprint+create"></a>

### blueprint.create(blueprint) ⇒ <code>Promise.&lt;Object&gt;</code>
Creates a blueprint based on a passed in Javascript object.

**Kind**: instance method of [<code>Blueprint</code>](#Blueprint)  

| Param | Type | Description |
| --- | --- | --- |
| blueprint | <code>object</code> | a blueprint resource. |

<a name="Blueprint+delete"></a>

### blueprint.delete(name) ⇒ <code>Promise.&lt;Object&gt;</code>
Deletes the artifact

**Kind**: instance method of [<code>Blueprint</code>](#Blueprint)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the artifact |

<a name="Breed"></a>

## Breed
Class representing a Breed resource

**Kind**: global class  

* [Breed](#Breed)
    * [new Breed(http)](#new_Breed_new)
    * [.list()](#Breed+list) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.get(name)](#Breed+get) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.create(breed)](#Breed+create) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.delete(name)](#Breed+delete) ⇒ <code>Promise.&lt;Object&gt;</code>

<a name="new_Breed_new"></a>

### new Breed(http)

| Param | Type | Description |
| --- | --- | --- |
| http | <code>object</code> | instantiated axios client |

<a name="Breed+list"></a>

### breed.list() ⇒ <code>Promise.&lt;Array&gt;</code>
Get a list of breeds

**Kind**: instance method of [<code>Breed</code>](#Breed)  
<a name="Breed+get"></a>

### breed.get(name) ⇒ <code>Promise.&lt;Object&gt;</code>
Describes a single breed resource

**Kind**: instance method of [<code>Breed</code>](#Breed)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | name of the breed |

<a name="Breed+create"></a>

### breed.create(breed) ⇒ <code>Promise.&lt;Object&gt;</code>
Creates a breed based on a passed in Javascript object.

**Kind**: instance method of [<code>Breed</code>](#Breed)  

| Param | Type | Description |
| --- | --- | --- |
| breed | <code>object</code> | a breed resource. |

<a name="Breed+delete"></a>

### breed.delete(name) ⇒ <code>Promise.&lt;Object&gt;</code>
Deletes the artifact

**Kind**: instance method of [<code>Breed</code>](#Breed)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the artifact |

<a name="Deployment"></a>

## Deployment
Class representing a Deployment resource

**Kind**: global class  

* [Deployment](#Deployment)
    * [new Deployment(http)](#new_Deployment_new)
    * [.list()](#Deployment+list) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.get(name)](#Deployment+get) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.deploy(deployment, blueprint)](#Deployment+deploy) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.undeploy(deployment, [service])](#Deployment+undeploy) ⇒ <code>Promise.&lt;Object&gt;</code>

<a name="new_Deployment_new"></a>

### new Deployment(http)

| Param | Type | Description |
| --- | --- | --- |
| http | <code>object</code> | instantiated axios client |

<a name="Deployment+list"></a>

### deployment.list() ⇒ <code>Promise.&lt;Array&gt;</code>
Get a list of deployments

**Kind**: instance method of [<code>Deployment</code>](#Deployment)  
<a name="Deployment+get"></a>

### deployment.get(name) ⇒ <code>Promise.&lt;Object&gt;</code>
Describes a single deployment resource

**Kind**: instance method of [<code>Deployment</code>](#Deployment)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | name of the deployment |

<a name="Deployment+deploy"></a>

### deployment.deploy(deployment, blueprint) ⇒ <code>Promise.&lt;Object&gt;</code>
Creates a deployment based on a blueprint under a specified name.

**Kind**: instance method of [<code>Deployment</code>](#Deployment)  

| Param | Type |
| --- | --- |
| deployment | <code>string</code> | 
| blueprint | <code>string</code> | 

<a name="Deployment+undeploy"></a>

### deployment.undeploy(deployment, [service]) ⇒ <code>Promise.&lt;Object&gt;</code>
Removes a running deployment. When passed the full name, it will retrieve the deployment and then use that resource
description in the DELETE command to fully remove the whole deployment.

**Kind**: instance method of [<code>Deployment</code>](#Deployment)  

| Param | Type | Description |
| --- | --- | --- |
| deployment | <code>string</code> | name of the deployment |
| [service] | <code>string</code> | name of a service to remove from a deployment |

<a name="Event"></a>

## Event
Class representing an Event

**Kind**: global class  

* [Event](#Event)
    * [new Event(http)](#new_Event_new)
    * [.emit(value, tags)](#Event+emit) ⇒ <code>Promise.&lt;Object&gt;</code>

<a name="new_Event_new"></a>

### new Event(http)

| Param | Type | Description |
| --- | --- | --- |
| http | <code>object</code> | instantiated axios client |

<a name="Event+emit"></a>

### event.emit(value, tags) ⇒ <code>Promise.&lt;Object&gt;</code>
Emits an event with a set of tags

**Kind**: instance method of [<code>Event</code>](#Event)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | the contents for the "value" key in the event |
| tags | <code>Array.&lt;string&gt;</code> | array of tags added to the "tags" key in the event |

<a name="Gateway"></a>

## Gateway
Class representing a Gateway resource

**Kind**: global class  

* [Gateway](#Gateway)
    * [new Gateway(http)](#new_Gateway_new)
    * [.list()](#Gateway+list) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.get(name)](#Gateway+get) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.delete(name)](#Gateway+delete) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.update(name, payload)](#Gateway+update) ⇒ <code>Promise.&lt;Object&gt;</code>

<a name="new_Gateway_new"></a>

### new Gateway(http)

| Param | Type | Description |
| --- | --- | --- |
| http | <code>object</code> | instantiated axios client |

<a name="Gateway+list"></a>

### gateway.list() ⇒ <code>Promise.&lt;Array&gt;</code>
Get a list of gateways

**Kind**: instance method of [<code>Gateway</code>](#Gateway)  
<a name="Gateway+get"></a>

### gateway.get(name) ⇒ <code>Promise.&lt;Object&gt;</code>
Describes a single gateway resource

**Kind**: instance method of [<code>Gateway</code>](#Gateway)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | name of the breed |

<a name="Gateway+delete"></a>

### gateway.delete(name) ⇒ <code>Promise.&lt;Object&gt;</code>
Deletes the artifact

**Kind**: instance method of [<code>Gateway</code>](#Gateway)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the artifact |

<a name="Gateway+update"></a>

### gateway.update(name, payload) ⇒ <code>Promise.&lt;Object&gt;</code>
Updates a gateway

**Kind**: instance method of [<code>Gateway</code>](#Gateway)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the artifact |
| payload | <code>object</code> | A full gateway artifact |

<a name="Workflow"></a>

## Workflow
Class representing a Workflow resource

**Kind**: global class  

* [Workflow](#Workflow)
    * [new Workflow(http)](#new_Workflow_new)
    * [.list()](#Workflow+list) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.get(name)](#Workflow+get) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.create(workflow)](#Workflow+create) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.delete(workflow)](#Workflow+delete) ⇒ <code>Promise.&lt;Object&gt;</code>

<a name="new_Workflow_new"></a>

### new Workflow(http)

| Param | Type | Description |
| --- | --- | --- |
| http | <code>object</code> | instantiated axios client |

<a name="Workflow+list"></a>

### workflow.list() ⇒ <code>Promise.&lt;Array&gt;</code>
Get a list of workflows

**Kind**: instance method of [<code>Workflow</code>](#Workflow)  
<a name="Workflow+get"></a>

### workflow.get(name) ⇒ <code>Promise.&lt;Object&gt;</code>
Describes a single workflow resource

**Kind**: instance method of [<code>Workflow</code>](#Workflow)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | name of the workflow |

<a name="Workflow+create"></a>

### workflow.create(workflow) ⇒ <code>Promise.&lt;Object&gt;</code>
Creates a workflow based on a passed in Javascript object.

**Kind**: instance method of [<code>Workflow</code>](#Workflow)  

| Param | Type | Description |
| --- | --- | --- |
| workflow | <code>object</code> | a workflow resource. |

<a name="Workflow+delete"></a>

### workflow.delete(workflow) ⇒ <code>Promise.&lt;Object&gt;</code>
Deletes the artifact

**Kind**: instance method of [<code>Workflow</code>](#Workflow)  

| Param | Type | Description |
| --- | --- | --- |
| workflow | <code>string</code> | Name of the artifact |

