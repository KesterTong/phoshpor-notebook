module Cell {

    import DOM = phosphor.virtualdom.dom;
    import Component = phosphor.components.Component;
    import IElement = phosphor.virtualdom.IElement;
    import IData = phosphor.virtualdom.IData;
    import CodeMirror = phosphor.components.CodeMirrorFactory;
    import createFactory = phosphor.virtualdom.createFactory;

    var div = DOM.div;
    var pre = DOM.pre

    export interface IOutputData extends IData{
        output:IExecuteResult| IStream| IError
    }


    // enum of the different message type we can receive. 
    // though you cannot map to string. 
    // Find a way.
    export enum EnumOutputType {
        Execute,
        Display
    }


    /**
     *  Common ancestor of all the type of message that can be received
     *  and displayed in a a notebook,
     **/
    export interface IOutputType extends IData{
        output_type:string;
    }


    /**
     * Display data output type
     **/
    export interface IDisplayData extends IOutputType{
        data:any;
        metadata:any;
    }
    /** Execut result Data output Type **/
    export interface IExecuteResult extends IOutputType{
        data:any;
        execution_count:number;
        metadata:any;
    }

    export interface IStream extends IOutputType{
        name:string;
        text:string[];
    }

    export interface IError extends IOutputType{
        ename:string;
        evalue:string;
        traceback: string[];
    }


    export interface ICellData extends IData {
      /**
       * Model data of the cell
       *
       * Data that will be synced across collaborators and that contains
       * meaning fullinformation like metadata, text and type of cell
       */
      model:CellModel;
      requestSelect:() => void
      /**
       * Is the cell currently selected
       *
       * Will affect actions, like copy pasting and of course 
       * style of the cell.
       */
      selected:boolean;
      rendered?:boolean;
    }



    export interface IMimeBundle extends IData {
        [k:string]:any
    }



    /**
     * Will select and display the right thing in a mimebundle
     **/
    export class MimeBundle extends Component<IMimeBundle>{
        render():IElement{
            var img:any = this.data['image/png']
            if(img){
                return DOM.img({'src':'data:image/png;base64,'+img})
            }
            return div(null, 
                    this.data['text/plain'])

        }
    }

    export class DisplayData extends Component<IDisplayData>{
        render(){
            return createFactory(MimeBundle)(this.data.data)
        }
    }

    export class ExecuteResult extends Component<IExecuteResult>{
        render():IElement {
            return createFactory(MimeBundle)(this.data.data)
        }

    }

    export class TraceBack extends Component<IError>{
        static tagName = 'div';

        render():IElement{
            var o = this.data;
            return pre({}, o.ename+'\n'+o.evalue+'\n'+(o.traceback.join('\n')))
        }
    }

    export class Stream extends Component<IStream>{
        static tagName = 'div';

        render():IElement{
             return pre({}, this.data.text.join('\n'))
        }

    }

    export class OutputAreaComponent extends Component<IOutputData>{
        static tagName = 'div';

        render():IElement{
            return div({style:'color:red'},'Heyyyyyyyyyy Not handeled case !')
        }

    }

    private var OAs = createFactory(OutputAreaComponent);
    private var TBs = createFactory(TraceBack);
    private var STs = createFactory(Stream);
    private var ERs = createFactory(ExecuteResult);
    private var DDs = createFactory(DisplayData);

    export class CellComponent extends Component<ICellData> {

      static tagName = 'div';

      // code_cell and rendered are probably not static, and should be part of a method.
      //static className = 'cell code_cell rendered';

      constructor() {
        super();
        this.node.onclick = this.onclick.bind(this);
      }

      onclick(): void {
        this.data.requestSelect();
      }

      beforeRender(): void {
        this.node.className = 'cell code_cell rendered' 
                + (this.data.rendered ? ' rendered' : '')
                + (this.data.selected ? ' selected' : '');
      }

      render(): IElement[] {
        var input_prompt_number = this.data.model.execution_count;
        var input_number = input_prompt_number == null ? ' ' : String(input_prompt_number);
        var input_prompt = 'In [' + input_number + ']:';


        var outputs_areas:any[] = [];
        for(var i in this.data.model.outputs){
            if(this.data.model.outputs[i].output_type=='stream'){
                outputs_areas.push(STs(this.data.model.outputs[i]))
            } else if(this.data.model.outputs[i].output_type =='error') {
                outputs_areas.push(TBs(this.data.model.outputs[i]))
            } else if(this.data.model.outputs[i].output_type =='execute_result') {
                outputs_areas.push(ERs(this.data.model.outputs[i]))
            } else if(this.data.model.outputs[i].output_type =='display_data') {
                outputs_areas.push(DDs(this.data.model.outputs[i]))
            } else {
                console.log('unhandled type: ',this.data.model.outputs[i])
            }

        }
        
        var ret = div({className: 'input'},
            div({className: 'prompt input_prompt'}, input_prompt),
            div({className: 'inner_cell'},
              div({className: 'input_area'},
                CodeMirror({key: this.data.key + '-cm', config: {mode: 'python', value:this.data.model.source}})
              ),
            outputs_areas
            )
          )
        

        return [ret];
      }
    }

    export var Cell = createFactory(CellComponent);

}
