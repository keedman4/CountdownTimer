import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'CountdownWebPartStrings';
import Countdown from './components/Countdown';
import { ICountdownProps } from './components/ICountdownProps';
import { PropertyFieldDateTimePicker, DateConvention, TimeConvention, IDateTimeFieldValue } from '@pnp/spfx-property-controls/lib/PropertyFieldDateTimePicker';

export interface ICountdownWebPartProps {
  description: string;
  datetime:IDateTimeFieldValue;
}



export default class CountdownWebPart extends BaseClientSideWebPart<ICountdownWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ICountdownProps> = React.createElement(
      Countdown,
      {
        description: this.properties.description,
        idatetime:this.properties.datetime
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyFieldDateTimePicker('datetime', {
                  label: 'Select the date and time',
                  initialDate: this.properties.datetime,
                  dateConvention: DateConvention.DateTime,
                  timeConvention: TimeConvention.Hours12,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'dateTimeFieldId'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
