class HWSet:
    def __init__(self, id, c_qty, a_qty):
        # Capacity --> total number of units. Initial value=qty
        # Availability --> number of units available to check out. Initial value=Capacity
        # checkedout --> number of checked out units. Initial value=0
        self.__ID = id
        self.__capacity = c_qty
        self.__availability = a_qty
        self.__checkedout = c_qty - a_qty

    def get_ID(self):

        return self.__ID

    def get_availability(self):
        # accessor function to return the number of unused units
        return self.__availability

    def get_capacity(self):
        # accessor function to return the total capacity of units
        return self.__capacity

    def get_checkedout_qty(self):
        # accessor function to return the total number of checkout quantities
        return self.__checkedout

    def check_out(self, qty):
        """method that checks out number of units specified by qty. 
        This method should update the number of units available after check_out. 
        Successfully check out, return 1
        This method should handle the situation if the quantity requested is greater than 
        the current availability in the following manner: 
        Not allow users to check out the number of units that are available and then return 0"""
        if qty <= self.__availability:
            self.__availability -= qty
            self.__checkedout += qty
            return 1
        else:
            # self.__checkedout += self.__availability
            # self.__availability = self.__capacity - self.__checkedout
            return 0

    def check_in(self, qty):
        """method that checks in number of units specified by qty. 
        This method should update the number of units available after check_in."""
        self.__availability += qty
        self.__checkedout -= qty
