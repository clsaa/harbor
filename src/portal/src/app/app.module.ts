// Copyright Project Harbor Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';

import { BaseModule } from './base/base.module';
import { HarborRoutingModule } from './harbor-routing.module';
import { SharedModule } from './shared/shared.module';
import { AccountModule } from './account/account.module';
import { ConfigurationModule } from './config/config.module';
import { DeveloperCenterModule } from './dev-center/dev-center.module';
import { registerLocaleData } from '@angular/common';

import { TranslateService } from "@ngx-translate/core";
import { AppConfigService } from './app-config.service';
import { SkinableConfig } from "./skinable-config.service";
import { ProjectConfigComponent } from './project/project-config/project-config.component';

import zh from '@angular/common/locales/zh-Hans';
import es from '@angular/common/locales/es';
import localeFr from '@angular/common/locales/fr';
import { DevCenterComponent } from './dev-center/dev-center.component';
registerLocaleData(zh, 'zh-cn');
registerLocaleData(es, 'es-es');
registerLocaleData(localeFr, 'fr-fr');


export function initConfig(configService: AppConfigService, skinableService: SkinableConfig) {
    return () => {
        skinableService.getCustomFile();
        configService.load();
    };
}

export function getCurrentLanguage(translateService: TranslateService) {
    return translateService.currentLang;
}

@NgModule({
    declarations: [
        AppComponent,
        ProjectConfigComponent
    ],
    imports: [
        BrowserModule,
        SharedModule,
        BaseModule,
        AccountModule,
        HarborRoutingModule,
        ConfigurationModule,
        DeveloperCenterModule
    ],
    exports: [
    ],
    providers: [
      AppConfigService,
      SkinableConfig,
      {
        provide: APP_INITIALIZER,
        useFactory: initConfig,
        deps: [ AppConfigService, SkinableConfig],
        multi: true
      },
      {
        provide: LOCALE_ID,
        useFactory: getCurrentLanguage,
        deps: [ TranslateService ]
      }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
