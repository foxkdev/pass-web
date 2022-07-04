// import React from 'react';
import { Component, createElement } from 'react';
import Tagify from '@yaireo/tagify'

export interface TagsProps {
    settings: any;
    value: any;
    name: string;
    className: string;
    class: string;
    autofocus: boolean;
    mode: string;
    initialValue: any;
}
class Tags extends Component<TagsProps>{
    tagify: Tagify;
    component: any;
    
    constructor( props: TagsProps ){
        super(props);
        this._handleRef = this._handleRef.bind(this);
    }

    componentDidMount(){
        this.tagify = new Tagify(this.component, this.props.settings || {});
    }

    shouldComponentUpdate(nextProps: any, nextState: any){
        // check if value has changed
        if( nextProps.value && nextProps.value.join() != this.props.value.join() ){
            this.tagify.loadOriginalValues(nextProps.value);
            // this.tagify.addTags(nextProps.value, true, true)
        }

        this.tagify.settings.whitelist = nextProps.settings.whitelist;

        if( nextProps.showDropdown )
            this.tagify.dropdown.show.call(this.tagify, nextProps.showDropdown);

        // do not allow react to re-render since the component is modifying its own HTML
        return false;
    }

    _handleRef(component: any){
        this.component = component;
    }
    getDefaultProps() {
        return {
            mode: 'input',
            value: []
        }
    }
    render(){
        const attrs = {
            ref         : this._handleRef,
            name        : this.props.name,
            className   : this.props.className,
            placeholder : this.props.class,
            autoFocus   : this.props.autofocus
        }

        return createElement(this.props.mode, Object.assign({}, attrs, {defaultValue: this.props.initialValue}))
    }
}


export default Tags;