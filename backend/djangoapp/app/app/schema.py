import graphene
from graphene_django import DjangoObjectType

from authentication.models import Account, AuthAccount, org
from activities.models import Activity
from assets.models import Asset
from suppliers.models import Supplier
from teams.models import Team


class AuthAccountType(DjangoObjectType):
    id = graphene.Int()
    email = graphene.String()
    is_active = graphene.Boolean()
    is_staff = graphene.Boolean()
    is_superuser = graphene.Boolean()
    created_at = graphene.DateTime()
    updated_at = graphene.DateTime()

    def resolve_id(self, info):
        if not info.context.user.has_perm("authentication.view_authaccount"):
            return None
        return self.id

    def resolve_email(self, info):
        if not info.context.user.has_perm("authentication.view_authaccount"):
            return None
        return self.email

    def resolve_is_active(self, info):
        if not info.context.user.has_perm("authentication.view_authaccount"):
            return None
        return self.is_active

    def resolve_is_staff(self, info):
        if not info.context.user.has_perm("authentication.view_authaccount"):
            return None
        return self.is_staff

    def resolve_is_superuser(self, info):
        if not info.context.user.has_perm("authentication.view_authaccount"):
            return None
        return self.is_superuser

    def resolve_created_at(self, info):
        if not info.context.user.has_perm("authentication.view_authaccount"):
            return None
        return self.created_at

    class Meta:
        model = AuthAccount
        fields = (
            "id",
            "email",
            "is_active",
            "is_staff",
            "is_superuser",
            "created_at",
            "updated_at",
        )


class AccountType(DjangoObjectType):
    id = graphene.Int()
    account = graphene.Field(AuthAccountType)
    provider = graphene.String()

    def resolve_id(self, info):
        if not info.context.user.has_perm("authentication.view_account"):
            return None
        return self.id

    def resolve_account(self, info):
        if not info.context.user.has_perm("authentication.view_account"):
            return None
        return self.account

    def resolve_provider(self, info):
        if not info.context.user.has_perm("authentication.view_account"):
            return None
        return self.provider

    class Meta:
        model = Account
        fields = ("id", "account", "provider")


class orgType(DjangoObjectType):

    id = graphene.Int()
    name = graphene.String()
    description = graphene.String()
    admin = graphene.Field(AuthAccountType)

    def resolve_id(self, info):
        if not info.context.user.has_perm("authentication.view_org"):
            return None
        return self.id

    def resolve_name(self, info):
        if not info.context.user.has_perm("authentication.view_org"):
            return None
        return self.name

    def resolve_description(self, info):
        if not info.context.user.has_perm("authentication.view_org"):
            return None
        return self.description

    def resolve_admin(self, info):
        if not info.context.user.has_perm("authentication.view_org"):
            return None
        return self.admin

    class Meta:
        model = org
        fields = ("id", "name", "description", "admin")


class SupplierType(DjangoObjectType):
    id = graphene.Int()
    name = graphene.String()
    description = graphene.String()
    country = graphene.String()
    phone = graphene.String()
    email = graphene.String()
    isGDPRCompliant = graphene.Boolean()
    isSOXCompliant = graphene.Boolean()
    isPCICompliant = graphene.Boolean()
    isHIPAACompliant = graphene.Boolean()
    RTO = graphene.Int()
    RPO = graphene.Int()
    isDeleted = graphene.Boolean()
    createdAt = graphene.DateTime()
    updatedAt = graphene.DateTime()
    createdBy = graphene.String()
    updatedBy = graphene.String()
    deletedBy = graphene.String()
    tags = graphene.JSONString()

    def resolve_id(self, info):
        if not info.context.user.has_perm("suppliers.view_supplier"):
            return None
        return self.id

    def resolve_name(self, info):
        if not info.context.user.has_perm("suppliers.view_supplier"):
            return None
        return self.name

    def resolve_description(self, info):
        if not info.context.user.has_perm("suppliers.view_supplier"):
            return None
        return self.description

    def resolve_country(self, info):
        if not info.context.user.has_perm("suppliers.view_supplier"):
            return None
        return self.country

    def resolve_phone(self, info):
        if not info.context.user.has_perm("suppliers.view_supplier"):
            return None
        return self.phone

    def resolve_email(self, info):
        if not info.context.user.has_perm("suppliers.view_supplier"):
            return None
        return self.email

    def resolve_isGDPRCompliant(self, info):
        if not info.context.user.has_perm("suppliers.view_supplier"):
            return None
        return self.isGDPRCompliant

    def resolve_isSOXCompliant(self, info):
        if not info.context.user.has_perm("suppliers.view_supplier"):
            return None
        return self.isSOXCompliant

    def resolve_isPCICompliant(self, info):
        if not info.context.user.has_perm("suppliers.view_supplier"):
            return None
        return self.isPCICompliant

    def resolve_isHIPAACompliant(self, info):
        if not info.context.user.has_perm("suppliers.view_supplier"):
            return None
        return self.isHIPAACompliant

    def resolve_RTO(self, info):
        if not info.context.user.has_perm("suppliers.view_supplier"):
            return None
        return self.RTO

    def resolve_RPO(self, info):
        if not info.context.user.has_perm("suppliers.view_supplier"):
            return None
        return self.RPO

    def resolve_isDeleted(self, info):
        if not info.context.user.has_perm("suppliers.view_supplier"):
            return None
        return self.isDeleted

    def resolve_createdAt(self, info):
        if not info.context.user.has_perm("suppliers.view_supplier"):
            return None
        return self.createdAt

    def resolve_updatedAt(self, info):
        if not info.context.user.has_perm("suppliers.view_supplier"):
            return None
        return self.updatedAt

    def resolve_createdBy(self, info):
        if not info.context.user.has_perm("suppliers.view_supplier"):
            return None
        return self.createdBy

    def resolve_updatedBy(self, info):
        if not info.context.user.has_perm("suppliers.view_supplier"):
            return None
        return self.updatedBy

    def resolve_deletedBy(self, info):
        if not info.context.user.has_perm("suppliers.view_supplier"):
            return None
        return self.deletedBy

    def resolve_tags(self, info):
        if not info.context.user.has_perm("suppliers.view_supplier"):
            return None
        return self.tags

    class Meta:
        model = Supplier
        fields = (
            "id",
            "name",
            "description",
            "country",
            "phone",
            "email",
            "isGDPRCompliant",
            "isSOXCompliant",
            "isPCICompliant",
            "isHIPAACompliant",
            "RTO",
            "RPO",
            "isDeleted",
            "createdAt",
            "updatedAt",
            "createdBy",
            "updatedBy",
            "deletedBy",
            "tags",
        )


class TeamType(DjangoObjectType):
    id = graphene.Int()
    name = graphene.String()
    description = graphene.String()
    contact = graphene.String()
    location = graphene.String()
    isDeleted = graphene.Boolean()
    createdAt = graphene.DateTime()
    updatedAt = graphene.DateTime()
    createdBy = graphene.String()
    updatedBy = graphene.String()
    deletedBy = graphene.String()

    def resolve_id(self, info):
        if not info.context.user.has_perm("teams.view_team"):
            return None
        return self.id

    def resolve_name(self, info):
        if not info.context.user.has_perm("teams.view_team"):
            return None
        return self.name

    def resolve_description(self, info):
        if not info.context.user.has_perm("teams.view_team"):
            return None
        return self.description

    def resolve_contact(self, info):
        if not info.context.user.has_perm("teams.view_team"):
            return None
        return self.contact

    def resolve_location(self, info):
        if not info.context.user.has_perm("teams.view_team"):
            return None
        return self.location

    def resolve_isDeleted(self, info):
        if not info.context.user.has_perm("teams.view_team"):
            return None
        return self.isDeleted

    def resolve_createdAt(self, info):
        if not info.context.user.has_perm("teams.view_team"):
            return None
        return self.createdAt

    def resolve_updatedAt(self, info):
        if not info.context.user.has_perm("teams.view_team"):
            return None
        return self.updatedAt

    def resolve_createdBy(self, info):
        if not info.context.user.has_perm("teams.view_team"):
            return None
        return self.createdBy

    def resolve_updatedBy(self, info):
        if not info.context.user.has_perm("teams.view_team"):
            return None
        return self.updatedBy

    def resolve_deletedBy(self, info):
        if not info.context.user.has_perm("teams.view_team"):
            return None
        return self.deletedBy

    class Meta:
        model = Team
        fields = (
            "id",
            "name",
            "description",
            "contact",
            "location",
            "isDeleted",
            "createdAt",
            "updatedAt",
            "createdBy",
            "updatedBy",
            "deletedBy",
        )


class AssetType(DjangoObjectType):
    id = graphene.Int()
    name = graphene.String()
    type = graphene.String()
    description = graphene.String()
    contact = graphene.String()
    supplier = graphene.Field(SupplierType)
    isGDPRCompliant = graphene.Boolean()
    isSOXCompliant = graphene.Boolean()
    isPCICompliant = graphene.Boolean()
    isHIPAACompliant = graphene.Boolean()
    RTO = graphene.Int()
    RPO = graphene.Int()
    isDeleted = graphene.Boolean()
    createdAt = graphene.DateTime()
    updatedAt = graphene.DateTime()
    createdBy = graphene.String()
    updatedBy = graphene.String()
    deletedBy = graphene.String()
    activitySpecific = graphene.String()
    tags = graphene.JSONString()

    def resolve_id(self, info):
        if not info.context.user.has_perm("assets.view_asset"):
            return None
        return self.id

    def resolve_name(self, info):
        if not info.context.user.has_perm("assets.view_asset"):
            return None
        return self.name

    def resolve_type(self, info):
        if not info.context.user.has_perm("assets.view_asset"):
            return None
        return self.type

    def resolve_description(self, info):
        if not info.context.user.has_perm("assets.view_asset"):
            return None
        return self.description

    def resolve_contact(self, info):
        if not info.context.user.has_perm("assets.view_asset"):
            return None
        return self.contact

    def resolve_supplier(self, info):
        if not info.context.user.has_perm("assets.view_asset"):
            return None
        return self.supplier

    def resolve_isGDPRCompliant(self, info):
        if not info.context.user.has_perm("assets.view_asset"):
            return None
        return self.isGDPRCompliant

    def resolve_isSOXCompliant(self, info):
        if not info.context.user.has_perm("assets.view_asset"):
            return None
        return self.isSOXCompliant

    def resolve_isPCICompliant(self, info):
        if not info.context.user.has_perm("assets.view_asset"):
            return None
        return self.isPCICompliant

    def resolve_isHIPAACompliant(self, info):
        if not info.context.user.has_perm("assets.view_asset"):
            return None
        return self.isHIPAACompliant

    def resolve_RTO(self, info):
        if not info.context.user.has_perm("assets.view_asset"):
            return None
        return self.RTO

    def resolve_RPO(self, info):
        if not info.context.user.has_perm("assets.view_asset"):
            return None
        return self.RPO

    def resolve_isDeleted(self, info):
        if not info.context.user.has_perm("assets.view_asset"):
            return None
        return self.isDeleted

    def resolve_createdAt(self, info):
        if not info.context.user.has_perm("assets.view_asset"):
            return None
        return self.createdAt

    def resolve_updatedAt(self, info):
        if not info.context.user.has_perm("assets.view_asset"):
            return None
        return self.updatedAt

    def resolve_createdBy(self, info):
        if not info.context.user.has_perm("assets.view_asset"):
            return None
        return self.createdBy

    def resolve_updatedBy(self, info):
        if not info.context.user.has_perm("assets.view_asset"):
            return None
        return self.updatedBy

    def resolve_deletedBy(self, info):
        if not info.context.user.has_perm("assets.view_asset"):
            return None
        return self.deletedBy

    def resolve_activitySpecific(self, info):
        if not info.context.user.has_perm("assets.view_asset"):
            return None
        return self.activitySpecific

    def resolve_tags(self, info):
        if not info.context.user.has_perm("assets.view_asset"):
            return None
        return self.tags

    class Meta:
        model = Asset
        fields = "__all__"


class ActivityType(DjangoObjectType):
    id = graphene.Int()
    name = graphene.String()
    description = graphene.String()
    assets = graphene.List(AssetType)
    teams = graphene.List(TeamType)
    isGDPRCompliant = graphene.Boolean()
    isSOXCompliant = graphene.Boolean()
    isPCICompliant = graphene.Boolean()
    isHIPAACompliant = graphene.Boolean()
    RTO = graphene.Int()
    RPO = graphene.Int()
    isDeleted = graphene.Boolean()
    createdAt = graphene.DateTime()
    updatedAt = graphene.DateTime()
    createdBy = graphene.String()
    updatedBy = graphene.String()
    deletedBy = graphene.String()
    tags = graphene.JSONString()

    def resolve_id(self, info):
        if not info.context.user.has_perm("activities.view_activity"):
            return None
        return self.id

    def resolve_name(self, info):
        if not info.context.user.has_perm("activities.view_activity"):
            return None
        return self.name

    def resolve_description(self, info):
        if not info.context.user.has_perm("activities.view_activity"):
            return None
        return self.description

    def resolve_assets(self, info):
        if not info.context.user.has_perm("activities.view_activity"):
            return None
        return self.assets

    def resolve_teams(self, info):
        if not info.context.user.has_perm("activities.view_activity"):
            return None
        return self.teams

    def resolve_isGDPRCompliant(self, info):
        if not info.context.user.has_perm("activities.view_activity"):
            return None
        return self.isGDPRCompliant

    def resolve_isSOXCompliant(self, info):
        if not info.context.user.has_perm("activities.view_activity"):
            return None
        return self.isSOXCompliant

    def resolve_isPCICompliant(self, info):
        if not info.context.user.has_perm("activities.view_activity"):
            return None
        return self.isPCICompliant

    def resolve_isHIPAACompliant(self, info):
        if not info.context.user.has_perm("activities.view_activity"):
            return None
        return self.isHIPAACompliant

    def resolve_RTO(self, info):
        if not info.context.user.has_perm("activities.view_activity"):
            return None
        return self.RTO

    def resolve_RPO(self, info):
        if not info.context.user.has_perm("activities.view_activity"):
            return None
        return self.RPO

    def resolve_isDeleted(self, info):
        if not info.context.user.has_perm("activities.view_activity"):
            return None
        return self.isDeleted

    def resolve_createdAt(self, info):
        if not info.context.user.has_perm("activities.view_activity"):
            return None
        return self.createdAt

    def resolve_updatedAt(self, info):
        if not info.context.user.has_perm("activities.view_activity"):
            return None
        return self.updatedAt

    def resolve_createdBy(self, info):
        if not info.context.user.has_perm("activities.view_activity"):
            return None
        return self.createdBy

    def resolve_updatedBy(self, info):
        if not info.context.user.has_perm("activities.view_activity"):
            return None
        return self.updatedBy

    def resolve_deletedBy(self, info):
        if not info.context.user.has_perm("activities.view_activity"):
            return None
        return self.deletedBy

    def resolve_tags(self, info):
        if not info.context.user.has_perm("activities.view_activity"):
            return None
        return self.tags

    class Meta:
        model = Activity
        fields = (
            "id",
            "name",
            "description",
            "assets",
            "teams",
            "isGDPRCompliant",
            "isSOXCompliant",
            "isPCICompliant",
            "isHIPAACompliant",
            "RTO",
            "RPO",
            "isDeleted",
            "createdAt",
            "updatedAt",
            "createdBy",
            "updatedBy",
            "deletedBy",
            "tags",
        )


class Query(graphene.ObjectType):
    accounts = graphene.List(AccountType)
    auth_accounts = graphene.List(AuthAccountType)
    orgs = graphene.List(orgType)
    activities = graphene.List(ActivityType)
    assets = graphene.List(AssetType)
    suppliers = graphene.List(SupplierType)
    teams = graphene.List(TeamType)

    def resolve_accounts(self, info, **kwargs):
        # if not info.context.user.has_perm('authentication.view_account'):
        #    return Account.objects.none()
        return Account.objects.all()

    def resolve_auth_accounts(self, info, **kwargs):
        # if not info.context.user.has_perm("authentication.view_authaccount"):
        #     return AuthAccount.objects.none()
        return AuthAccount.objects.all()

    def resolve_orgs(self, info, **kwargs):
        if not info.context.user.has_perm("authentication.view_org"):
            return org.objects.none()
        return org.objects.all()

    def resolve_activities(self, info, **kwargs):
        if not info.context.user.has_perm("activities.view_activity"):
            return Activity.objects.none()
        return Activity.objects.all()

    def resolve_assets(self, info, **kwargs):
        if not info.context.user.has_perm("assets.view_asset"):
            return Asset.objects.none()
        return Asset.objects.all()

    def resolve_suppliers(self, info, **kwargs):
        if not info.context.user.has_perm("suppliers.view_supplier"):
            return Supplier.objects.none()
        return Supplier.objects.all()

    def resolve_teams(self, info, **kwargs):
        if not info.context.user.has_perm("teams.view_team"):
            return Team.objects.none()
        return Team.objects.all()


schema = graphene.Schema(query=Query)
