const { expectRevert, time } = require('@openzeppelin/test-helpers');
const { assert } = require('chai');
const CakeToken = artifacts.require('CakeToken');
const TlosStaking = artifacts.require('TlosStaking');
const MockBEP20 = artifacts.require('libs/MockBEP20');
const WTLOS = artifacts.require('libs/WTLOS');

contract('TlosStaking.......', async ([alice, bob, admin, dev, minter]) => {
  beforeEach(async () => {
    this.rewardToken = await CakeToken.new({ from: minter });
    this.lpToken = await MockBEP20.new('LPToken', 'LP1', '1000000', {
      from: minter,
    });
    this.wTLOS = await WTLOS.new({ from: minter });
    this.tlosChef = await TlosStaking.new(
      this.wTLOS.address,
      this.rewardToken.address,
      1000,
      10,
      1010,
      admin,
      this.wTLOS.address,
      { from: minter }
    );
    await this.rewardToken.mint(this.tlosChef.address, 100000, { from: minter });
  });

  it('deposit/withdraw', async () => {
    await time.advanceBlockTo('10');
    await this.tlosChef.deposit({ from: alice, value: 100 });
    await this.tlosChef.deposit({ from: bob, value: 200 });
    assert.equal(
      (await this.wTLOS.balanceOf(this.tlosChef.address)).toString(),
      '300'
    );
    assert.equal((await this.tlosChef.pendingReward(alice)).toString(), '1000');
    await this.tlosChef.deposit({ from: alice, value: 300 });
    assert.equal((await this.tlosChef.pendingReward(alice)).toString(), '0');
    assert.equal((await this.rewardToken.balanceOf(alice)).toString(), '1333');
    await this.tlosChef.withdraw('100', { from: alice });
    assert.equal(
      (await this.wTLOS.balanceOf(this.tlosChef.address)).toString(),
      '500'
    );
    await this.tlosChef.emergencyRewardWithdraw(1000, { from: minter });
    assert.equal((await this.tlosChef.pendingReward(bob)).toString(), '1399');
  });

  it('should block man who in blanklist', async () => {
    await this.tlosChef.setBlackList(alice, { from: admin });
    await expectRevert(
      this.tlosChef.deposit({ from: alice, value: 100 }),
      'in black list'
    );
    await this.tlosChef.removeBlackList(alice, { from: admin });
    await this.tlosChef.deposit({ from: alice, value: 100 });
    await this.tlosChef.setAdmin(dev, { from: minter });
    await expectRevert(
      this.tlosChef.setBlackList(alice, { from: admin }),
      'admin: wut?'
    );
  });

  it('emergencyWithdraw', async () => {
    await this.tlosChef.deposit({ from: alice, value: 100 });
    await this.tlosChef.deposit({ from: bob, value: 200 });
    assert.equal(
      (await this.wTLOS.balanceOf(this.tlosChef.address)).toString(),
      '300'
    );
    await this.tlosChef.emergencyWithdraw({ from: alice });
    assert.equal(
      (await this.wTLOS.balanceOf(this.tlosChef.address)).toString(),
      '200'
    );
    assert.equal((await this.wTLOS.balanceOf(alice)).toString(), '100');
  });

  it('emergencyRewardWithdraw', async () => {
    await expectRevert(
      this.tlosChef.emergencyRewardWithdraw(100, { from: alice }),
      'caller is not the owner'
    );
    await this.tlosChef.emergencyRewardWithdraw(1000, { from: minter });
    assert.equal((await this.rewardToken.balanceOf(minter)).toString(), '1000');
  });

  it('setLimitAmount', async () => {
    // set limit to 1e-12 TLOS
    await this.tlosChef.setLimitAmount('1000000', { from: minter });
    await expectRevert(
      this.tlosChef.deposit({ from: alice, value: 100000000 }),
      'exceed the to'
    );
  });
});
