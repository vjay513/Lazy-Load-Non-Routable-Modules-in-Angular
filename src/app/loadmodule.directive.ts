import { Directive, OnInit, OnDestroy, Input, NgModuleRef, ViewContainerRef, Injector, NgModuleFactoryLoader, Inject } from '@angular/core';
import { NgModuleFactory } from '@angular/core/src/r3_symbols';
import { LAZY_MODULES, LAZY_MODULES_MAP } from '../tokenFactory';

@Directive({
    selector: '[loadModule]'
  })
  export class LoadModuleDirective implements OnInit, OnDestroy {
    @Input('loadModule') moduleName: keyof LAZY_MODULES;
    private moduleRef: NgModuleRef<any>;
    type ModuleWithRoot = Type<any> & { rootComponent: Type<any> };
    
    constructor(
      private vcr: ViewContainerRef,
      private injector: Injector,
      private loader: NgModuleFactoryLoader,
      @Inject(LAZY_MODULES_MAP) private modulesMap
    ) {}
  
    ngOnInit() {
        this.loader
          .load(this.modulesMap[this.moduleName])
          .then((moduleFactory: NgModuleFactory<any>) => {
            this.moduleRef = moduleFactory.create(this.injector);
            const rootComponent = (moduleFactory.moduleType as ModuleWithRoot)
              .rootComponent;
      
            const factory = this.moduleRef.componentFactoryResolver.resolveComponentFactory(
              rootComponent
            );
      
            this.vcr.createComponent(factory);
          });
      }
    ngOnDestroy() {
        this.moduleRef && this.moduleRef.destroy();
      }
      
  }