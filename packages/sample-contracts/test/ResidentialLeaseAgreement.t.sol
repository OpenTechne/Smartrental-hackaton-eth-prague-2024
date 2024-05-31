// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {ResidentialLeaseAgreement} from "../src/ResidentialLeaseAgreement.sol";

contract ResidentialLeaseAgreementTest is Test {
    ResidentialLeaseAgreement _contract;
    address landlord = makeAddr("landlord");
    address tenant = makeAddr("tenant");
    uint256 DOWN_PAYMENT = 0.5 ether;
    uint256 MONTHLY_RENT = 0.25 ether;
    uint256 RENTAL_PERIOD = 365 days;
    uint256 PENALTY_INTEREST_RATE = 5;
    uint256 COMPENSATION = 0.5 ether;

    function setUp() public {
        _contract = new ResidentialLeaseAgreement(
            landlord, tenant, DOWN_PAYMENT, MONTHLY_RENT, RENTAL_PERIOD, PENALTY_INTEREST_RATE, COMPENSATION
        );
    }

    function testAcceptContract() public {
        assertEq(uint256(_contract.status()), 0);
        vm.deal(tenant, DOWN_PAYMENT + MONTHLY_RENT);
        vm.prank(tenant);
        _contract.acceptContract{value: DOWN_PAYMENT + MONTHLY_RENT}();
        assertEq(uint256(_contract.status()), 1);
    }

    function testFailAcceptContract(address a) public {
        assertEq(uint256(_contract.status()), 0);
        vm.deal(a, DOWN_PAYMENT);
        vm.prank(a);
        _contract.acceptContract();
    }

    function testFailLiquidation1() public {
        assertEq(uint256(_contract.status()), 0);
        vm.deal(tenant, DOWN_PAYMENT + MONTHLY_RENT);
        vm.prank(tenant);
        _contract.acceptContract{value: DOWN_PAYMENT + MONTHLY_RENT}();
        assertEq(uint256(_contract.status()), 1);

        vm.warp(block.timestamp + 29 days); // Tenant can't be liqiudated before
        _contract.liquidateDeposit();
    }

    function testLiquidation2() public {
        assertEq(uint256(_contract.status()), 0);
        vm.deal(tenant, DOWN_PAYMENT + MONTHLY_RENT);
        vm.prank(tenant);
        _contract.acceptContract{value: DOWN_PAYMENT + MONTHLY_RENT}();
        assertEq(uint256(_contract.status()), 1);

        vm.warp(block.timestamp + 31 days);
        uint256 balance = address(_contract).balance;
        console.log("Balance b liquidation: ", address(_contract).balance);
        _contract.liquidateDeposit();
        console.log("Balance a liquidation: ", address(_contract).balance);
        assertLt(address(_contract).balance, balance);
    }

    function testLiquidation3() public {
        assertEq(uint256(_contract.status()), 0);
        vm.deal(tenant, DOWN_PAYMENT + MONTHLY_RENT);
        vm.prank(tenant);
        _contract.acceptContract{value: DOWN_PAYMENT + MONTHLY_RENT}();
        assertEq(uint256(_contract.status()), 1);

        vm.warp(block.timestamp + 60 days);
        uint256 balance = address(_contract).balance;
        console.log("Balance b liquidation: ", address(_contract).balance);
        _contract.liquidateDeposit();
        console.log("Balance a liquidation: ", address(_contract).balance);
        assertLt(address(_contract).balance, balance);
    }

    function testLiquidation4() public {
        assertEq(uint256(_contract.status()), 0);
        vm.deal(tenant, DOWN_PAYMENT + MONTHLY_RENT);
        vm.prank(tenant);
        _contract.acceptContract{value: DOWN_PAYMENT + MONTHLY_RENT}();
        assertEq(uint256(_contract.status()), 1);

        vm.warp(block.timestamp + 29 days);
        uint256 landlordBalanceBefore = address(landlord).balance;
        vm.deal(tenant, MONTHLY_RENT);
        vm.prank(tenant);
        _contract.payRent{value: MONTHLY_RENT}();
        assertEq(landlordBalanceBefore + MONTHLY_RENT, address(landlord).balance);

        // console.log("Balance b liquidation: ", address(_contract).balance);
        // _contract.liquidateDeposit();
        // console.log("Balance a liquidation: ", address(_contract).balance);
    }

    function testFailLiquidation5() public {
        assertEq(uint256(_contract.status()), 0);
        vm.deal(tenant, DOWN_PAYMENT + MONTHLY_RENT);
        vm.prank(tenant);
        _contract.acceptContract{value: DOWN_PAYMENT + MONTHLY_RENT}();
        assertEq(uint256(_contract.status()), 1);

        vm.warp(block.timestamp + 29 days);
        uint256 landlordBalanceBefore = address(landlord).balance;
        vm.deal(tenant, MONTHLY_RENT);
        vm.prank(tenant);
        _contract.payRent{value: MONTHLY_RENT}();
        assertEq(landlordBalanceBefore + MONTHLY_RENT, address(landlord).balance);

        vm.warp(block.timestamp + 29 days);
        _contract.liquidateDeposit();
    }

    function testLiquidation6() public {
        assertEq(uint256(_contract.status()), 0);
        vm.deal(tenant, DOWN_PAYMENT + MONTHLY_RENT);
        vm.prank(tenant);
        _contract.acceptContract{value: DOWN_PAYMENT + MONTHLY_RENT}();
        assertEq(uint256(_contract.status()), 1);

        vm.warp(block.timestamp + 29 days);
        uint256 landlordBalanceBefore = address(landlord).balance;
        vm.deal(tenant, MONTHLY_RENT);
        vm.prank(tenant);
        _contract.payRent{value: MONTHLY_RENT}();
        assertEq(landlordBalanceBefore + MONTHLY_RENT, address(landlord).balance);

        vm.warp(block.timestamp + 35 days);
        uint256 balance = address(_contract).balance;
        console.log("Balance b liquidation: ", address(_contract).balance);
        _contract.liquidateDeposit();
        console.log("Balance a liquidation: ", address(_contract).balance);
        assertLt(address(_contract).balance, balance);        
    }
}
