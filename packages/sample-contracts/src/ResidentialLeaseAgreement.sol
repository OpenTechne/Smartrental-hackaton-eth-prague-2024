// SPDX-License-Identifier: MIT
pragma solidity 0.8.22;

contract ResidentialLeaseAgreement {
    enum Status {
        Pending,
        Acepted,
        Terminated
    }

    address public immutable landlord;
    address public immutable tenant;
    uint256 public immutable downPayment;
    uint256 public immutable monthlyRent;
    uint256 public immutable rentalPeriod;
    uint256 public immutable penaltyInterestRate;
    uint256 public immutable compensation;
    uint256 public startDate;
    uint256 public totalPayed;
    Status public status;

    constructor(
        address _landlord,
        address _tenant,
        uint256 _downPayment,
        uint256 _monthlyRent,
        uint256 _rentalPeriod,
        uint256 _penaltyInterestRate,
        uint256 _compensation
    ) {
        landlord = _landlord;
        tenant = _tenant;
        downPayment = _downPayment;
        monthlyRent = _monthlyRent;
        rentalPeriod = _rentalPeriod;
        penaltyInterestRate = _penaltyInterestRate;
        compensation = _compensation;
    }

    function acceptContract() external payable {
        require(status == Status.Pending, 'Contract should be pending');
        require(msg.sender == tenant, 'Only tenant can acept contract');
        require(msg.value == downPayment + monthlyRent, 'Tenant should deposit downPayment plus first month rent');
        status = Status.Acepted;
        startDate = block.timestamp;
    }

    function payRent() external payable {
        require(msg.sender == tenant, 'Only tenant can pay rent');
        require(msg.value == monthlyRent, 'Incorrect rent amount');
        require(address(this).balance >= monthlyRent + downPayment, 'Security Deposit should be always present');
        require(status == Status.Acepted, 'Contract should be acepted');
        totalPayed += monthlyRent;
        payable(landlord).transfer(monthlyRent);
    }

    function liquidateDeposit() external {
        require(status == Status.Acepted, 'Contract should be acepted');
        uint256 payedMonths = totalPayed / monthlyRent;
        uint256 timeOutOfPayment = block.timestamp - startDate - 30 days * payedMonths;
        require(timeOutOfPayment > 30 days, 'No time out of payment');
        uint256 ammountToLiquidate = ((timeOutOfPayment - 30 days) / 1 days) * monthlyRent * penaltyInterestRate / 100;
        if (ammountToLiquidate > address(this).balance) {
            ammountToLiquidate = address(this).balance;
        }
        payable(landlord).transfer(ammountToLiquidate);
    }

    function terminateContract() external payable {
        require(status == Status.Acepted, 'Contract should be acepted');
        if (block.timestamp >= startDate + rentalPeriod) {
            status = Status.Terminated;
            payable(tenant).transfer(address(this).balance);
            return;
        }
        require(msg.sender == tenant || msg.sender == landlord, 'Only tenant or landlord can terminate a contract');
        if (msg.sender == tenant) {
            payable(landlord).transfer(address(this).balance);
        } else {
            require(msg.value == compensation, 'Landlord should pay compensation');
            payable(tenant).transfer(address(this).balance);
        }
        status = Status.Terminated;
    }
}
