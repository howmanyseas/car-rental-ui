import { DataSource } from '@angular/cdk/collections';
import { Observable, of as observableOf } from 'rxjs';

// Data model type for RentalLists
export interface RentalListsItem {
  rentalId: string;
  customer: string;
  car: string;
  employee: string;
  checkOutPrice: string;
  checkOut: Date;
  checkIn: Date;
  status: string;
}

// Example data for demonstration
const EXAMPLE_DATA: RentalListsItem[] = [
  {
    rentalId: '00001',
    customer: 'Ben Dough',
    car: 'Toyota Corolla',
    employee: 'John',
    checkOutPrice: '€150',
    checkOut: new Date(2023, 2, 20),
    checkIn: new Date(2023, 2, 25),
    status: 'Completed',
  },
  {
    rentalId: '00002',
    customer: 'Ben Dough',
    car: 'Suzuki Swift',
    employee: 'Alex',
    checkOutPrice: '€120',
    checkOut: new Date(2023, 2, 21),
    checkIn: new Date(2023, 2, 26),
    status: 'Active',
  },
  {
    rentalId: '00003',
    customer: 'Ben Dough',
    car: 'Ford Focus',
    employee: 'Smith',
    checkOutPrice: '€100',
    checkOut: new Date(2023, 2, 22),
    checkIn: new Date(2023, 2, 27),
    status: 'Active',
  },
  {
    rentalId: '00004',
    customer: 'Ben Dough',
    car: 'Hyundai Elantra',
    employee: 'Mike',
    checkOutPrice: '€140',
    checkOut: new Date(2023, 2, 23),
    checkIn: new Date(2023, 2, 28),
    status: 'Completed',
  },
];

/**
 * Data source for the RentalLists view.
 */
export class RentalListsDataSource extends DataSource<RentalListsItem> {
  data: RentalListsItem[] = EXAMPLE_DATA;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<RentalListsItem[]> {
    return observableOf(this.data);
  }

  /**
   * Called when the table is being destroyed.
   */
  disconnect(): void {}
}
