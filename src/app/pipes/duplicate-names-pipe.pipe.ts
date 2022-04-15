import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'duplicateNamesPipe'
})
export class DuplicateNamesPipePipe implements PipeTransform
{

    transform(value: string, ...args: any[]): unknown
    {
        if (args[0] == 0) return value
        let name = value;
        for (let i = args[1] - 1; i >= 0; i--)
        {
            if (name == args[0][i].name)
            {
                name = "Duplicate" + Math.floor(Math.random() * 100000);
                break;
            }
        }

        return name;
    }

}
