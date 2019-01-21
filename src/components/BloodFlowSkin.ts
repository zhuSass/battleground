class BloodFlowSkin extends eui.ProgressBar implements  eui.UIComponent {
	public constructor() {
		super();
		this.width = 300;
		this.height = 20;
		this.minimum = 0;
		this.maximum = 100;
		this.value = 100;
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
	}
	
}