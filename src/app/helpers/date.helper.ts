export class DateHelper{

    static dateFormat(date: Date): string | null {
        if (date == null) {
          return null;
        }
        const day = this.leadingZero(date.getDate());
        const month = this.leadingZero(date.getMonth() + 1);
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
      }

    static leadingZero(value: number): string {
        if (value < 10) {
            return `0${value}`;
        }
        return String(value);
    }  
}